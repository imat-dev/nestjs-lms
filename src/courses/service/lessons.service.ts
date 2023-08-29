import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateLessonDto } from '../dto/create-lesson.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Lesson } from 'src/entities/lesson.entity';

@Injectable()
export class LessonsService {
  constructor(
    @InjectModel('Lesson')
    private readonly lessonModel: Model<Lesson>,
  ) {}

  async find(
    courseId: string,
    sortOrder: string,
    pageNumber: number,
    pageSize: number,
  )  {
    return await this.lessonModel.find(
      {
        course: courseId,
      },
      null,
      {
        skip: pageSize * (pageNumber - 1),
        limit: pageSize,
        sort :{
            seqNo : sortOrder
        }
      },
    );
  }
}
