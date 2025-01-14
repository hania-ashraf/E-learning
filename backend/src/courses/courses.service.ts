import { ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { courses } from 'src/models/courses.Schema';
import { modules } from 'src/models/modules.Schema';
import { CreateModuleDto } from './dto/createModule.dto';
import * as fs from 'fs';
import * as path from 'path';
import { GetStudentCoursesDto } from './dto/getStudentCourse.dto';
import { Users } from 'src/models/users.Schema';
import { SearchCourseDto } from './dto/searchCourse.dto';

@Injectable()
export class CoursesService {
    constructor(@InjectModel('courses') private readonly coursesModel: mongoose.Model<courses>,
    @InjectModel('modules') private readonly moduleModel: mongoose.Model<modules>,
    @InjectModel('Users') private readonly userModel: mongoose.Model<Users>
){}

async studentTookCourse(getStudentCourse: GetStudentCoursesDto) {
    try {
      // Construct the query based on the provided information (either studentId or studentName)
      let query = {};

      if (getStudentCourse.studentId) {
        query['_id'] = getStudentCourse.studentId;
      }

      if (getStudentCourse.studentName) {
        query['name'] = getStudentCourse.studentName;
      }
      const student = await this.userModel.findOne(query);

      if (!student) {
        throw new Error('Student not found');
      }

      return student.coursesEnrolled;

    } catch (error) {
      console.error('Error fetching student enrolled courses:', error);
      throw new Error('An error occurred while fetching the student courses.');
    }
  }



  async deleteCourse(_id:string, role:string){
    try {
        // Check if the user is an instructor or admin
        if (role !== 'instructor' && role !== 'admin') {
          throw new ForbiddenException('You do not have permission to delete the course.');
        }
  
        const course = await this.coursesModel.findById(_id);

        if (!course) {
          throw new Error('Course not found');
        }
        // Mark the course as unavailable
        course.isAvailable = false;
        await course.save();
  
        return {
          message: 'Course has been marked as unavailable.',
          course,
        };
      } catch (error) {
        console.error('Error deleting the course:', error);
        throw new Error('An error occurred while deleting the course.');
      }
  }


  async searchCourse(searchCourseDto: SearchCourseDto) {
    try {
      
      const query: any = {};
  
      if (searchCourseDto.title) {
        query.title = { $regex: searchCourseDto.title, $options: 'i' }; // Case-insensitive partial search
      }
      if (searchCourseDto.course_id) {
        query.course_id = searchCourseDto.course_id; // Exact match for course_id
      }

      const course = await this.coursesModel.findOne(query);
  
      if (!course) {
        throw new NotFoundException('Course not found');
      }
  
      return course;
    } catch (error) {
      throw new InternalServerErrorException(
        'Error occurred while searching for courses',
        error.message,
      );
    }
  }
  

  async completeCourse(_id: string) {
    try {
      const instructor = await this.coursesModel.find({ instructorTeach: _id });

      if (instructor.length === 0) {
        throw new NotFoundException('No courses found for this instructor');
      }

      const result = instructor.map((ins) => ({
        courseId: ins.course_id,
        courseName: ins.title,
        studentsCompleted: ins.completedBy.length, // Count of students
      }));

      return result;
    } catch (error) {
      throw new Error(`Failed to complete course: ${error.message}`);
    }
  }

 async studentsCompletedCourse(_id: string){

  try{
    const courses = await this.coursesModel.find({completedBy:_id});
    if(courses.length === 0) {
      throw new NotFoundException('No Courses Completed By this Student');
  }
  const result = courses.map((course)=>({
    courseId: course.course_id,
    courseName: course.title
  }));
  return result;
 }catch (error) {
  throw new Error(`Failed to complete course: ${error.message}`);
}
 }

async createModule(_id:string, createModuleDto:CreateModuleDto,resources:Express.Multer.File[]){

    const course= await this.coursesModel.findById(_id);
    console.log(course);
    if(!course){
        throw new Error(`Course with ID ${_id} not found.`);
    }

    const uploadPath = path.join(__dirname, '..', '..', 'uploads');
    if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath);
    }

    // Handle file uploads and store them locally
    const resourcePaths: string[] = [];

    if (resources && resources.length > 0) {
        for (const file of resources) {
            const filePath = path.join(uploadPath, file.originalname); // Save to the 'uploads' folder
            fs.writeFileSync(filePath, file.buffer);  // Write file content to disk
            resourcePaths.push(`/uploads/${file.originalname}`); // Save relative path
        }
    }

    const newModule= new this.moduleModel({...createModuleDto,course_id:_id,resources:resourcePaths})
    course.Module.push(newModule._id);
    await newModule.save();

    return newModule;



}

}
