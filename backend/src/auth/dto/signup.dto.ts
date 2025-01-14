import { IsString, IsEmail, IsEnum, MinLength } from 'class-validator';
export enum UserType {
    STUDENT = 'student',
    INSTRUCTOR = 'instructor',
  }

export class signUpDto{

    name: string;

    email: string;

    password: string;

    @IsEnum(UserType)
    role: UserType;

    profile_picture_url?: string;

}

