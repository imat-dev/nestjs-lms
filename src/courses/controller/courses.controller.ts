import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CoursesService } from '../service/courses.service';
import { CreateCourseDto } from '../dto/create-course.dto';
import { UpdateCourseDto } from '../dto/update-course.dto';
import { ToIntegerPipe } from '../pipe/to-integer';
import { Course } from 'src/entities/course.entity';
// import { findAllCourses } from 'db_data';

@Controller('courses')
// @UseFilters(new HttpExceptionFilter()) // controller custom httpexerptionfilter
export class CoursesController {
  private readonly logger = new Logger(CoursesController.name);

  constructor(private readonly courseService: CoursesService) {}

  @Get()
  async findAll() {
    // return 'test'
    // return findAllCourses();
    return await this.courseService.findAll();
  }

  @Get(':courseUrl')
  async find(@Param('courseUrl') courseUrl: string) {
    const course = this.courseService.findByUrl(courseUrl);
    if (!course) {
      throw new NotFoundException();
    }
    return course;
  }

  //Partial course since there's no ID in inputs, return value should have the Id hence Promise<Course>
  @Post()
  async createCourse(@Body() course: Partial<Course>) {
    return await this.courseService.createCrouse(course);
  }

  // @UseFilters(new HttpExceptionFilter()) // Put custom httpexerptionfilter
  @Put(':courseId')
  async updateCourse(
    @Param('courseId') courseId: string,
    @Body() changes: UpdateCourseDto,
  ) {
    return await this.courseService.updateCourse(courseId, changes);
  }

  @Delete(':courseId')
  async deleteCourse(@Param('courseId') courseId: string) {
    return await this.courseService.deleteCourse(courseId);
  }
}
