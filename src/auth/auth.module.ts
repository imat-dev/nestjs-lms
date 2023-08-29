import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { UserSchema } from 'src/entities/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Users',
        schema: UserSchema,
      },
    ]),
    JwtModule.register({
      secret: process.env.AUTH_SECRET,
      signOptions: {
        expiresIn: '60m',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
