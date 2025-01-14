import { Injectable, UnauthorizedException, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>('IS_PUBLIC_KEY', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('No token, please login');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: '1708cdbb0ebd9f816ddc6ca2f30d9faa27b16d2aeff31f440e9a4aeb50adf011cafeea0430c18bddd877244e84a4c6435b1ad97b9998e67eb0c2b63adc790ec1',
      });

      console.log('Authenticated User in AuthGuard:', payload);
      // Assigning the payload to the request object so it can be used in route handlers
      request['user'] = payload;
     
    } catch {
      throw new UnauthorizedException('Invalid token');
    }

    return true;
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const token = request.cookies?.authToken || request.headers['authorization']?.split(' ')[1];
    return token;
  }
}



// import {PassportStrategy} from '@nestjs/passport';
// import {Strategy} from 'passport-local';
// import { AuthService } from '../auth.service';
// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { ExtractJwt } from 'passport-jwt';

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy, 'jwt'){
//     constructor (){
//         super({
//             jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//             ignoreExpiration: false,
//             secretOrKey: '1708cdbb0ebd9f816ddc6ca2f30d9faa27b16d2aeff31f440e9a4aeb50adf011cafeea0430c18bddd877244e84a4c6435b1ad97b9998e67eb0c2b63adc790ec1',
//           });
//     }

//     async validate (payload: any  ){
//         console.log(payload);
//         if (!payload || !payload.userid) {
//             throw new UnauthorizedException('Invalid token');
//           }
//         return { userid: payload.userid, role: payload.role };

//     }
// }