import { IsString, IsMongoId } from 'class-validator';
export class ThreadsDto{
  @IsMongoId()
  course?: string;

  @IsString()
    title?: string

  @IsString()
  content: string

  @IsMongoId()
  createdBy:string

}