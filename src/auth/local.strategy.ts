import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/entities/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(LocalStrategy.name);

  constructor(
    @InjectModel('Users')
    private readonly userModel: Model<User>,
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
      this.logger.debug(`User $email not found.`);
      throw new UnauthorizedException();
    }

    this.logger.debug(user);
    this.logger.debug(user.passwordHash);
    this.logger.debug(user.email);

    if (password !== user.passwordHash) {
      this.logger.debug(`Password incorrect`);
      throw new UnauthorizedException();
    }

    return user;
  }
}
