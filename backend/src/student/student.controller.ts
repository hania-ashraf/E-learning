import { Controller , Get , Request ,Post,Put} from '@nestjs/common';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
    constructor( private readonly studentService: StudentService){}

    
    @Get('profile')
    async getprofile(@Request() req) {
        const userId= req.user.id;
        return this.studentService.getProfile(userId);

    }
    @Get('courses')
    async enrolledCourses(@Request() req) {
        const userId= req.user.id;
        return this.studentService.enrolledCourses(userId);
    }

    @Get('progress')
    async getprogress(@Request() req) {
        const userId= req.user.id;
        return this.studentService.getProgress(userId);
    }
}
