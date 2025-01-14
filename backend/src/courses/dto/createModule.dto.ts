import { IsNotEmpty, IsString, IsOptional, IsArray, IsMongoId } from 'class-validator';

export class CreateModuleDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    content: string;

    @IsOptional()
    @IsArray()
    resources?: string[];

    @IsNotEmpty()
    @IsMongoId()  // Ensure the courseId is a valid MongoDB ObjectId
    course_Id: string;
}
