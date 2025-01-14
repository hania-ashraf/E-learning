import { Body, Controller, Delete, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/strategies/authenticationGuard';
import { InstructorService } from './instructor.service';
import { AuthorizationGuard } from 'src/auth/strategies/AuthorizationGuard';
import { UpdateInfoDto } from './dto/updateInfo.dto';
import { UpdateCourseDto } from './dto/updateCourse.dto';
import { CreateModuleDto } from './dto/createModule.dto';

@Controller('instructor')
@UseGuards(AuthGuard)
export class InstructorController {
    constructor( private readonly instructorService: InstructorService){}

    @UseGuards(AuthorizationGuard)
    @Put('updateinfo')
    async updateInfo(@Req() {user}, @Body() updateInfoDto:UpdateInfoDto) {
        return this.instructorService.updateInfo(user.userid, updateInfoDto);

    }

    @UseGuards(AuthorizationGuard)
    @Put('courseinfo')
    async updateCourse(@Req() {user}, @Body() updateCourseDto:UpdateCourseDto) {
        return this.instructorService.updateCourse(user.userid, updateCourseDto);
    }
     
    @UseGuards(AuthorizationGuard)
    @Delete('deleteInstructor')
    async deleteInstructor(@Req() {user}) {
        return this.instructorService.deleteInstructor(user.userid);

    }

    @UseGuards(AuthorizationGuard)
    @Delete('averageScoreCourse')
    async averageScoreCourse(@Req() {user}) {
        return this.instructorService.averageScoreCourse(user.userid);

    }

    @UseGuards(AuthorizationGuard)
    @Post('createModule')
  async createModule(@Body() createModuleDto: CreateModuleDto, @Req() {user}) {
    return await this.instructorService.createModule(user.userid,createModuleDto);
  }



    

    
}
