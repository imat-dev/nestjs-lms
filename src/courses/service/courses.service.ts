import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateCourseDto } from '../dto/create-course.dto';
import { InjectModel } from '@nestjs/mongoose';
import { DeleteResult } from 'mongodb';
import { UpdateCourseDto } from '../dto/update-course.dto';
import { Course } from 'src/entities/course.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel('Course')
    private readonly coursesModel: Model<Course>,
  ) {}

  public async findAll(): Promise<Course[]> {
    const result = await this.coursesModel.find();
    return result;
  }

  public async findByUrl(courseUrl: string): Promise<Course> {
    const result = await this.coursesModel.findOne({ url: courseUrl });
    return result;
  }

  public async updateCourse(
    courseId: string,
    changes: UpdateCourseDto,
  ): Promise<Course> {
    console.log(courseId);

    const result = await this.coursesModel.findOneAndUpdate(
      { _id: courseId },
      changes,
      {
        returnOriginal: false,
      },
    );

    console.log(result);

    return result;
  }

  public async deleteCourse(courseId: string): Promise<DeleteResult> {
    return await this.coursesModel.deleteOne({ _id: courseId });
  }

  public async createCrouse(course: any): Promise<Course> {
    console.log(course);

    //saving into memory first
    const newCourse = new this.coursesModel(course);

    try {
      const savedCourse = await newCourse.save();
      return savedCourse;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }

    // console.log(newCourse);
    //return the converted object in memory
    // return await newCourse.toObject({ versionKey: false });
  }
}
