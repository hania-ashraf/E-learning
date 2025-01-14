import { Body, Controller, Get, Injectable, Param, Post, Req, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateModuleDto } from './dto/createModule.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/strategies/authenticationGuard';
import { Roles } from 'src/auth/decrators/role.decrator';
import { AuthorizationGuard } from 'src/auth/strategies/AuthorizationGuard';
import { GetStudentCoursesDto } from './dto/getStudentCourse.dto';
import { SearchCourseDto } from 'src/courses/dto/searchCourse.dto';
import { Role } from 'src/constants/roles.enum';
//import { Public } from 'src/auth/decrators/public.decrator';

@Controller('courses')
@UseGuards(AuthGuard)
export class CoursesController {
    constructor (private readonly courseService: CoursesService){}

    @Roles(Role.Instructor)
    @UseGuards(AuthorizationGuard)
    @Post('enrolled')
    async studentTookCourse(@Body() getStudentCourse:GetStudentCoursesDto){
        return this.courseService.studentTookCourse(getStudentCourse);
    }
    
    @Roles(Role.Instructor,Role.Admin)
    @UseGuards(AuthorizationGuard)
    @Post('delete')
    async deleteCourse(@Body('courseId') courseId:string ,@Req() {user}){
        return this.courseService.deleteCourse(courseId, user.Role);
    }

 
    @Roles(Role.Student)
    @UseGuards(AuthorizationGuard)
    @Post('search')
  async searchCourse(@Body() searchCourseDto: SearchCourseDto) {
    return await this.courseService.searchCourse(searchCourseDto);
  }

  //for Instructors only to track the students that completed the course
  @UseGuards(AuthorizationGuard)
  @Get('completeCourse')
  async completedCourses(@Req() {user}){

    const numberOfStudents= await this.courseService.completeCourse(user.userid);
    return numberOfStudents;

  }

  //
  @UseGuards(AuthorizationGuard)
  @Get('completeCourse')
  async studentsCompletedCourse(@Req() {user}){

    const numberOfStudents= await this.courseService.studentsCompletedCourse(user.userid);
    return numberOfStudents;

  }



    @Post(':courseId/modules')
    @UseInterceptors(
        FileFieldsInterceptor([
            { name: 'resources', maxCount: 10 },  // Accept multiple files for resources
        ])
    )
    @ApiBody({ type: CreateModuleDto })
  @ApiConsumes('multipart/form-data')
    createModule (@Param(':courseId') courseId:string,
    @Body() createModuleDto: CreateModuleDto,
    @UploadedFiles() files: { resources?: Express.Multer.File[] }){
        console.log('Received files:', files); // Log received files
    console.log('Received body:', createModuleDto);

        const Module= this.courseService.createModule(courseId, createModuleDto,files.resources);
        return {message: 'Module created successfully', Module};
    }
}
