import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ModuleSchema } from 'src/models/modules.Schema';
import { CourseSchema } from 'src/models/courses.Schema';
import { UserSchema } from 'src/models/users.Schema';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports:[MongooseModule.forFeature([
    {name: 'modules' , schema: ModuleSchema},
  {name: 'courses' , schema: CourseSchema},
  {name: 'Users' , schema: UserSchema}])],
  
  providers: [CoursesService,JwtService],
  controllers: [CoursesController]
})
export class CoursesModule {}
