import {
	Controller,
	Post,
	UseGuards,
} from '@nestjs/common';
import { AuthService } from '../auth.service';
import { User } from 'src/entities/user.entity';
import { CurrentUser } from '../current-user.decorator';
import { AuthGuardLocal } from '../guards/auth-guard.local';

@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService,
	) {}

	@Post('login')
	//@UseGuards(AuthGuard('local')) //will run validate method in local.strategy.ts, will pass the return object in @Request() request.user
	@UseGuards(AuthGuardLocal) //transfering AuthGuard('local') to a class to avoid typo
	async signIn(@CurrentUser() user: User) {
		//IMPORTANT: request body should be {username, password} only. you can change it in super() of Local Strategy Class

		return {
			userId: user._id,
			token: await this.authService.getToken(user),
		};
	}
}
