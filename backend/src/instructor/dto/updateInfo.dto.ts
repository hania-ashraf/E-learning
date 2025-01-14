import { IsEmail, IsEnum, IsOptional, IsString, IsUrl, Length } from 'class-validator';

export class UpdateInfoDto {
  @IsOptional()
  @IsString()
  @Length(2, 50, { message: 'Name must be between 2 and 50 characters.' })
  name?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Please provide a valid email address.' })
  email?: string;

  @IsOptional()
  @IsString()
  @Length(5, 20, { message: 'Password must be between 5 and 20 characters.' })
  password?: string;

  @IsOptional()
  @IsUrl({}, { message: 'Profile picture must be a valid URL.' })
  profile_picture_url?: string;
}
