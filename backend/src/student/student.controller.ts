import { Controller , Get , Request , UseGuards, Req, Put, Body, Delete} from '@nestjs/common';
import { StudentService } from './student.service';
import { AuthorizationGuard } from 'src/auth/strategies/AuthorizationGuard';
import { AuthGuard } from 'src/auth/strategies/authenticationGuard';
import { UpdateUserDto } from './dto/updateInfo.dto';

@Controller('student')
@UseGuards(AuthGuard)
export class StudentController {
    constructor( private readonly studentService: StudentService){}


    //@UseGuards(AuthGuard)// handler level
    // @Get('currentUser')
    // async getCurrentUser(@Req() {user}) {
    //     const student = await this.studentService.findById(user.userid);
    //     console.log(student)
    //     return student;
    // }

    @UseGuards(AuthorizationGuard)
    @Get('profile')
    async getprofile(@Req() {user}) {
        console.log('User from JWT:', user.userid);  // Debugging log
        return this.studentService.getProfile(user.userid);

    }
    
    @UseGuards(AuthorizationGuard)
    @Get('courses')
    async enrolledCourses(@Request() {user}) {
        return this.studentService.enrolledCourses(user.userid);
    }

    @UseGuards(AuthorizationGuard)
    @Put('updateinfo')
    async updateInfo(@Req() {user}, @Body() updateUserDto:UpdateUserDto) {
        return this.studentService.updateInfo(user.userid, updateUserDto);

    }

    @UseGuards(AuthorizationGuard)
    @Delete('deleteStudent')
    async deleteStudent(@Req() {user}) {
        return this.studentService.deleteStudent(user.userid);

    }

//track the completed courses
    @Get('completeCourse')
    async completedCourses(@Request() {user}) {
        return this.studentService.getProgress(user.userid);
    }

    @UseGuards(AuthorizationGuard)
    @Get('averageScore')
    async averageScore (@Request() {user}){
        return this.studentService.averageScore(user.userid);

    }
    
}
