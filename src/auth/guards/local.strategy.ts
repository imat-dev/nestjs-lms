import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/entities/user.entity';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(LocalStrategy.name);

  constructor(
    @InjectModel('Users')
    private readonly userModel: Model<User>,

    private readonly authService: AuthService,
  ) {
    super({
      usernameField: 'email',
    });
  }

  public async validate(email: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({
      email: email,
    });

    if (!user) {
      throw new UnauthorizedException('Incorrect username or password');
    }

    const isValid = await this.authService.comparePassword(
      password,
      user.passwordHash,
    );

    if (!isValid) {
      this.logger.debug(`Password incorrect`);
      throw new UnauthorizedException('Incorrect username or password');
    }

    return user;
  }
}
