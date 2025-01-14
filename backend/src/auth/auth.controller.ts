import { Controller ,Post,Body, HttpCode, HttpStatus, Res} from '@nestjs/common';
import { AuthService } from './auth.service';
import { signUpDto } from './dto/signup.dto';
import { payLoadDto } from './dto/payLoad.dto';
import { Response } from 'express';
import { Public } from './decrators/public.decrator';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService ) {}
    @Post('signup')
  async signup(@Body() signupDto: signUpDto) {
    return this.authService.signup(signupDto);
  }
  @Public()
   @Post('login')
   @HttpCode(HttpStatus.OK)
   async login(@Body() payLoadDto: payLoadDto, @Res({ passthrough: true }) res: Response) {

   const token= await this.authService.signIn(payLoadDto); 
   console.log(token);
   res.cookie('authToken', token, {
    httpOnly: true, // Secure against client-side scripts
    secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
    sameSite: 'strict', // Prevent cross-site requests
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
});
  //  if(!user) throw new HttpException('Invalid Credentials',401);
   return {token , message: 'Login successful' };
  }
  
  }
