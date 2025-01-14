import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Users } from 'src/models/users.Schema';
import { UpdateInfoDto } from './dto/updateInfo.dto';
import { courses } from 'src/models/courses.Schema';
import { UpdateCourseDto } from './dto/updateCourse.dto';
import { CreateModuleDto } from './dto/createModule.dto';
import { modules } from 'src/models/modules.Schema';

@Injectable()
export class InstructorService {
    constructor(@InjectModel (Users.name) private userModel: mongoose.Model<Users>,
    @InjectModel (courses.name) private courseModel: mongoose.Model<courses>,
    @InjectModel (modules.name) private moduleModel: mongoose.Model<modules>){}



    async updateInfo(_id : string, updateInfoDto:UpdateInfoDto){
        try {
          const updateUser = await this.userModel.findByIdAndUpdate( _id,updateInfoDto,
            { new: true, runValidators: true } // Ensure validation and return updated document
          );
      
          if (!updateUser) {
            throw new NotFoundException('User not found'); // Handle case where user doesn't exist
          }
          return { message: 'User updated successfully', updateUser };
      
        } catch (error) {
          throw new BadRequestException('Failed to update user', error.message);
        }
      }

      async updateCourse(_id : string, updateCourseDto:UpdateCourseDto){
        try {
          const updateCourse = await this.userModel.findByIdAndUpdate( _id,updateCourseDto,
            { new: true, runValidators: true } // Ensure validation and return updated document
          );
      
          if (!updateCourse) {
            throw new NotFoundException('User not found'); // Handle case where user doesn't exist
          }
          return { message: 'User updated successfully', updateCourse};
      
        } catch (error) {
          throw new BadRequestException('Failed to update user', error.message);
        }
      }


      async deleteInstructor(_id:string){
        try {
          const user = await this.userModel.findById(_id);
          if (!user) {
            throw new NotFoundException('User not found');
          }
      
          user.isAvailable = false; 
          await user.save();
      
          return { message: 'Your account has been deactivated successfully' };
        } catch (error) {
          throw error;
        }
      }

      async averageScoreCourse(_id:string){

        try {
          const course = await this.courseModel.find({instructorTeach:_id});
          if (course.length === 0) {
            throw new NotFoundException('No course for this instructor');
          }

         
        } catch (error) {
          throw error;
        }

      }
      
      async createModule (_id:string , createModuleDto: CreateModuleDto){
        try {
          const { course_Id, title, content, resources } = createModuleDto;
    
          const course = await this.courseModel.findById( course_Id );
          if (!course) {
            throw new NotFoundException('No course found with the provided ID');
          }
  
          const newModule = new this.moduleModel({
            ...createModuleDto,
            course_Id: course._id,
          });
    
          await newModule.save();
    
          course.Module.push(newModule._id);
          await course.save();
    
          return {
            message: 'The module has been created successfully',
            newModule: newModule,
          };
    
        } catch (error) {
          throw error;  
        }
      
      }
     
}
