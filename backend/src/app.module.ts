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
import { AuthModule } from './auth/auth.module';
import { ChatsModule } from './chats/chats.module';
import { DiscussionModule } from './discussion/discussion.module';
import { CoursesModule } from './courses/courses.module';

@Module({
  imports: [ MongooseModule.forFeature([{ name: 'Users', schema: UserSchema },
    {name: 'responses' , schema: ResponseSchema},
    {name: 'progress' , schema: ProgressSchema},
    {name: 'quizzes' , schema: QuizSchema},
    {name: 'modules' , schema: ModuleSchema},
    {name: 'courses' , schema: CourseSchema}
  ]), MongooseModule.forRoot('mongodb://localhost:27017/e-learning'), AuthModule, ChatsModule, DiscussionModule, CoursesModule],
  controllers: [AppController, AdminController, StudentController, InstructorController],
  providers: [AppService, AdminService, StudentService, InstructorService],
})
export class AppModule {}
