import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminService } from './admin/admin.service';
import { AdminController } from './admin/admin.controller';
import { StudentController } from './student/student.controller';
import { StudentService } from './student/student.service';
import { InstructorService } from './instructor/instructor.service';
import { InstructorController } from './instructor/instructor.controller';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './models/users.Schema';
import { ResponseSchema } from './models/responses.Schema';
import { ProgressSchema } from './models/progress.Schema';
import { QuizSchema } from './models/quizzes.Schema';
import { ModuleSchema } from './models/modules.Schema';
import { CourseSchema } from './models/courses.Schema';

@Module({
  imports: [ MongooseModule.forFeature([{ name: 'users', schema: UserSchema },
    {name: 'responses' , schema: ResponseSchema},
    {name: 'progress' , schema: ProgressSchema},
    {name: 'quizzes' , schema: QuizSchema},
    {name: 'modules' , schema: ModuleSchema},
    {name: 'courses' , schema: CourseSchema}
  ])],
  controllers: [AppController, AdminController, StudentController, InstructorController, AuthController],
  providers: [AppService, AdminService, StudentService, InstructorService, AuthService],
})
export class AppModule {}
