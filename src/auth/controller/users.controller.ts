import {
	BadRequestException,
	Body,
	ConsoleLogger,
	Controller,
	Get,
	Post,
	UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { AuthService } from '../auth.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/entities/user.entity';
import { CurrentUser } from '../current-user.decorator';
import { AuthGuardJwt } from '../guards/auth-guard.jwt';

@Controller('users')
export class UsersController {
	private readonly logger = new ConsoleLogger(UsersController.name);

	constructor(
		@InjectModel('Users')
		private readonly userModel: Model<User>,
		private readonly authService: AuthService
	) {}

	@Post()
	async createUser(@Body() createUserDto: CreateUserDto) {
		const passwordHash = await this.authService.hashPassword(
			createUserDto.password
		);

		//can remove this and use inputs directly
		const newUser = {
			email: createUserDto.email,
			passwordHash: passwordHash,
		};

		//check if user exist
		const user = await this.userModel.findOne({
			email: createUserDto.email,
		});
		if (user) {
			throw new BadRequestException(['Email already taken.']);
		}

		const registeredUser = await this.userModel.create(newUser);

		return {
			userId: registeredUser._id,
			token: await this.authService.getToken(registeredUser),
		};
	}

	@Get('profile')
	//@UseGuards(AuthGuard('jwt')) //will run validate method in jwt.strategy.ts, will pass the return object in @Request() request.user
	@UseGuards(AuthGuardJwt) //transfering AuthGuard('jwt') to avoid typo
	async getUser(@CurrentUser() user: User) {
		return user;
	}
}
