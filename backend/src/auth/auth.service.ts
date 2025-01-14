import { ConflictException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Users } from 'src/models/users.Schema';
import { signUpDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { payLoadDto } from './dto/payLoad.dto'

@Injectable()
export class AuthService {
  constructor(@InjectModel(Users.name) private userModel: mongoose.Model<Users>,
    private jwtService: JwtService) { }

  async signIn(payLoadDto: payLoadDto) {

    const findUser = await this.userModel.findOne({ email: payLoadDto.email });

    if (!findUser) throw new NotFoundException('User not Found');

    const isPasswordValid = await bcrypt.compare(payLoadDto.password, findUser.password);

    if (!isPasswordValid) throw new HttpException('Invalid Credentials', 401);

    const payload = { userid: findUser._id, role: findUser.role };

    console.log("payload:",payload);

    const accessToken = this.jwtService.sign(payload);

  return   accessToken;

  }

  async signup(signupDto: signUpDto) {

    const { name, email, password, role, profile_picture_url } = signupDto;

    const exsitingUser = await this.userModel.findOne({ email });
    //console.log('Existing user:', exsitingUser);

    if (exsitingUser) {
      throw new ConflictException('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const newUser = new this.userModel({ ...signupDto, password: hashedPassword });
      await newUser.save();


      return [{ message: "user registered Successfully!" },
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
