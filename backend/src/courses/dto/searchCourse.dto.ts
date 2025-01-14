import { IsOptional, IsString } from 'class-validator';

export class SearchCourseDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  course_id?: string;
}
