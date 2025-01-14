import { IsOptional, IsString, IsMongoId } from 'class-validator';

export class GetStudentCoursesDto {
  @IsOptional() // Make it optional, since they may provide either studentId or studentName
  @IsMongoId() // Validate it if provided as a MongoId
  studentId?: string;  // Student ID can be provided to fetch courses

  @IsOptional() // Make it optional too
  @IsString() // Validate it if provided as a string
  studentName?: string; // Student Name can be provided instead of ID
}
