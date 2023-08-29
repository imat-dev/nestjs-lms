import { Module } from '@nestjs/common';
import { CoursesModule } from './courses/courses.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true, //use variable in .env file
    }),
    MongooseModule.forRoot(process.env.MONGODB_CONNECTION_STRING),
    CoursesModule,
    AuthModule,
  ],
})
export class AppModule {}
