import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UserSchema } from 'src/models/users.Schema';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { APP_GUARD } from '@nestjs/core';
import { AuthorizationGuard } from './strategies/AuthorizationGuard';

@Module({
    imports:[
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret:'1708cdbb0ebd9f816ddc6ca2f30d9faa27b16d2aeff31f440e9a4aeb50adf011cafeea0430c18bddd877244e84a4c6435b1ad97b9998e67eb0c2b63adc790ec1',
            signOptions:{expiresIn:'7d'},
        }),MongooseModule.forFeature([{ name: Users.name, schema: UserSchema }])
    ],
    controllers: [AuthController],
    providers: [AuthService,
        {
        provide: APP_GUARD,
        useClass: AuthorizationGuard, // Set the AuthGuard as the global guard
      }
    ],
    exports: [AuthService,JwtModule]
})

export class AuthModule {}

//1708cdbb0ebd9f816ddc6ca2f30d9faa27b16d2aeff31f440e9a4aeb50adf011cafeea0430c18bddd877244e84a4c6435b1ad97b9998e67eb0c2b63adc790ec1