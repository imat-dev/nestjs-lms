import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/entities/user.entity';
import { Model } from 'mongoose';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,

    @InjectModel('Users')
    private readonly userModel: Model<User>,
  ) {}

  @Post('singup')
  async signUp(@Body() inputs: CreateUserDto) {
    const passwordHash = await this.authService.hashPassword(inputs.password);

    const newUser = {
      email: inputs.email,
      passwordHash: passwordHash,
    };

    return await this.userModel.create(newUser);
  }

  @Post('login')
  @UseGuards(AuthGuard('local')) //will run validate method in local.strategy.ts, will pass the return object in @Request() request.user
  async signIn(@Request() request) {
    //IMPORTANT: request body should be {username, password} only. you can change it in super() of Local Strategy Class

    return {
      userId: request.user._id,
      token: await this.authService.getToken(request.user),
    };
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt')) //will run validate method in jwt.strategy.ts, will pass the return object in @Request() request.user
  async getUser(@Request() request) {
    return request.user;
  }
}
