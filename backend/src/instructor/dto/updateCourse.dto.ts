import { IsString, IsNotEmpty, IsOptional, IsArray } from 'class-validator';
import { Types } from 'mongoose';

export class UpdateCourseDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  course_id?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  category?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  difficulty_level?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  created_by?: string;

  @IsOptional()
  @IsArray()
  Module?: Types.ObjectId[];

  @IsOptional()
  @IsArray()
  studentTook?: Types.ObjectId[];

  @IsOptional()
  @IsArray()
  instructorTeach?: Types.ObjectId[];
}
