import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateCourseDto {
  // @IsString()
  // @IsMongoId()
  // _id: string;

  @IsInt({ message: 'SeqNo must be numeric' })
  seqNo: number;

  @IsString({ always: true })
  url: string;

  @IsString()
  iconUrl: string;

  @IsString()
  @IsOptional()
  courseListIcon: string;

  @IsString()
  description: string;

  @IsString()
  longDescription?: string;

  @IsString()
  category: string;

  @IsInt()
  lessonsCount: number;

  @IsBoolean()
  promo: boolean;
}
