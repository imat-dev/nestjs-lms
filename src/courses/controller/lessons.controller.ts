import {
  BadRequestException,
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { LessonsService } from '../service/lessons.service';

@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonService: LessonsService) {}

  //   @Get()
  //   async findAll() {}

  @Get()
  async find(
    @Query('courseId') courseId: string,
    @Query('sortOrder') sortOrder = 'asc',
    @Query('pageNumber', new DefaultValuePipe(1), ParseIntPipe)
    pageNumber: number,
    @Query('pagSize', new DefaultValuePipe(3), ParseIntPipe) pageSize: number,
  ) {

    if (!courseId) {
      throw new BadRequestException('CouseID must be defined');
    }

    if (sortOrder !== 'asc' && sortOrder !== 'desc') {
      throw new BadRequestException('Sort order invalid');
    }

    //front-end app adjustment only do not apply on prod
    if(pageNumber === 0) {
      return await this.lessonService.find(
        courseId,
        sortOrder,
        1,
        pageSize,
      );
    }

    return await this.lessonService.find(
      courseId,
      sortOrder,
      pageNumber,
      pageSize,
    );
  }
}
