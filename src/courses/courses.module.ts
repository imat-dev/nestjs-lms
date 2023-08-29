import { Module } from '@nestjs/common';
import { CoursesController } from './controller/courses.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseSchema } from '../entities/course.entity';
import { CoursesService } from './service/courses.service';
import { LessonSchema } from '../entities/lesson.entity';
import { LessonsService } from './service/lessons.service';
import { LessonsController } from './controller/lessons.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Course',
        schema: CourseSchema,
      },
      {
        name: 'Lesson',
        schema: LessonSchema,
      },
    ]),
  ],
  controllers: [CoursesController, LessonsController],
  providers: [CoursesService, LessonsService],
})
export class CoursesModule {}
