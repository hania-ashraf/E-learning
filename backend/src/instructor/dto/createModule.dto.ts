import { IsString, IsNotEmpty, IsMongoId, IsOptional } from 'class-validator';

export class CreateModuleDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsMongoId()
  @IsNotEmpty()
  course_Id: string;  // Use this for selecting a course

  @IsOptional()
  resources?: string[]
}
