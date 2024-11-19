import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { progress } from 'src/models/progress.Schema';
import { users } from 'src/models/users.Schema';

@Injectable()
export class StudentService {
    constructor(@InjectModel (users.name) private userModel: mongoose.Model<users> ,
    @InjectModel (progress.name) private progressModel: mongoose.Model<progress>){}

  async getProfile(id : string){
    return await this.userModel.findById(id);
}

async enrolledCourses(id : string){
    const user = await this.userModel.findById(id);
    return  user.coursesEnrolled;
}

async getProgress(id : string){
  const student= await this.userModel.findById(id).populate('coursesEnrolled');
  if(!student){
      throw new NotFoundException('Student not found');
  }

  const progress= await this.progressModel.find({ userId: id })




}

}