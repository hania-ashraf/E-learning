import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { users } from 'src/models/users.Schema';
import { signUpDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(@InjectModel (users.name) private userModel: mongoose.Model<users>){}

    async signup(signupDto: signUpDto){

        const { name, email, password, role,profile_picture_url } = signupDto;

        const exsitingUser= await this.userModel.findOne({email});
        console.log('Existing user:', exsitingUser);

        if(exsitingUser){
            throw new ConflictException('Email already registered');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            const newUser = new this.userModel({ ...signupDto, password: hashedPassword });
            await newUser.save();
            

            return [{message: "user registered Successfully!"},
        {
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
            profile_picture_url: newUser.profile_picture_url,
          }];

          } catch (error) {
            if (error.code === 11000) { // MongoDB duplicate key error
              throw new ConflictException('Email already registered');
            }
            throw error;
          }

        



    }
}
