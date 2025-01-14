import { Controller ,Post,Body} from '@nestjs/common';
import { AuthService } from './auth.service';
import { signUpDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService ) {}

    @Post('signup')
  async signup(@Body() signupDto: signUpDto) {
    return this.authService.signup(signupDto);
  }
  
 
}
