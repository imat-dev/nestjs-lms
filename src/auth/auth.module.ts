import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth.service';
import { LocalStrategy } from './guards/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { UserSchema } from 'src/entities/user.entity';
import { JWTStrategy } from './guards/jwt.strategy';
import { UsersController } from './controller/users.controller';

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: 'Users',
				schema: UserSchema,
			},
		]),
		JwtModule.registerAsync({
			useFactory: () => ({
				secret: process.env.AUTH_SECRET,
				signOptions: {
					expiresIn: '60m',
				},
			}),
		}),
	],
	controllers: [AuthController, UsersController],
	providers: [AuthService, LocalStrategy, JWTStrategy],
})
export class AuthModule {}
