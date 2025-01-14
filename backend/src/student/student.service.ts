import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { progress } from 'src/models/progress.Schema';
import { Users } from 'src/models/users.Schema';
import { UpdateUserDto } from './dto/updateInfo.dto';
import { responses } from 'src/models/responses.Schema';

@Injectable()
export class StudentService {
    constructor(@InjectModel (Users.name) private userModel: mongoose.Model<Users> ,
    @InjectModel (progress.name) private progressModel: mongoose.Model<progress>,
    @InjectModel (responses.name) private responsesModel: mongoose.Model<responses>,
  ){}

//Test Api
  //   async findById(_id: string){
  //     console.log(_id)
  //     const student=  await this.userModel.findById(_id);  // Fetch a student by ID
  //     return student;
  // }
//-----------------------------------
  async getProfile(_id : string){
    return await this.userModel.findById(_id);
}

async enrolledCourses(_id: string): Promise<string[]> {
  try {
    console.log('Received User ID:', _id);
    const user = await this.userModel.findById(_id);

    if (!user) {
      throw new NotFoundException(`User with ID ${_id} not found`);
    }

    return user.coursesEnrolled;

  } catch (error) {
    console.error('Error while fetching enrolled courses:', error);
    throw new InternalServerErrorException(
      'An error occurred while retrieving the enrolled courses'
    );
  }
}

async updateInfo(_id : string, updateUserDto:UpdateUserDto){
  try {
    const updateUser = await this.userModel.findByIdAndUpdate( _id,updateUserDto,
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

async deleteStudent(_id:string){
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



async getProgress(_id: string) {
  try {
    const student = await this.progressModel.findOne({ user_Id: _id });
    if (!student) {
      throw new NotFoundException('Student not found');
    }
    return { 
      message: 'Progress fetched successfully', 
      completion_percentage: student.completion_percentage 
    };
  } catch (error) {
    throw error; 
  }
}


async averageScore(_id: string){

  try {
    const responses = await this.responsesModel.find({ user_Id: _id });
    if (responses.length === 0) {
      throw new NotFoundException('No responses for this student');
    }

    const scores = responses.reduce((sum,response)=> sum +(response.score || 0),0);
    const averageScore= scores / responses.length ; 

    return { 
      message: 'Average Scores fetched successfully', 
      averageScore: averageScore 
    };
  } catch (error) {
    throw error; 
  }
}


}