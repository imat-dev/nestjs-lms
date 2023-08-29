import {
  Controller,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('singup')
  async signUp() {}

  @Post('login')
  @UseGuards(AuthGuard('local')) //will run validate method in local.strategy.ts
  async signIn(@Request() request) { //IMPORTANT: request body should be {username, password} only. you can change it in super() of Local Strategy Class
    console.log('hey');
    // console.log(input.email);
    // console.log(input.password);
    // const user =  await this.authService.login(input.email, input.password);
    // if(!user) {
    //   throw new UnauthorizedException('Invalid username or pw')
    // }
    // return user;

    return {
      userId: request.user._id,
      token: 'Token will go here',
    };
  }
}
