import { IsMongoId, IsNumber, IsString } from 'class-validator';

export class CreateLessonDto {
  @IsString()
  description: string;

  @IsString()
  duration: string;

  @IsNumber()
  seqNo: string;

  @IsMongoId()
  course: string;
}
