import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { GuardService } from './guard.service';
import { Reflector } from '@nestjs/core';
import { Roles } from './roles.decorator';
import { JwtService } from '@nestjs/jwt';
import { Logger } from '@nestjs/common';

@Injectable()
export class RolesGuard implements CanActivate {
	private readonly jwtService = new JwtService();
	private readonly guardService = new GuardService();
	private readonly logger = new Logger(RolesGuard.name);

	constructor(private readonly reflector: Reflector) {}

	canActivate(
		context: ExecutionContext
	): boolean | Promise<boolean> | Observable<boolean> {
		
		//get roles of controller, request(@Post, @Get) and combines it
		// const allowedRoles = this.reflector.getAllAndOverride(Roles, [
			// 	context.getHandler(),
			// 	context.getClass(),
			// ]);
		
		const allowedRoles = this.reflector.get(Roles, context.getHandler()); // get roles of @Get @Post etc. only

		const request = context.switchToHttp().getRequest();
		const token = this.guardService.extractTokenFromHeaders(request);

		if (!token) {
			return false;
		}

		let userRoles = this.extractRolesFromToken(token);
		if (!userRoles) {
			return false;
		}


		const isAllowed = userRoles.find(userRole => allowedRoles.includes(userRole));
		if (isAllowed) {
			return true;
		}

		this.logger.debug(`User roles not allowed`);
		return false;
	}

	private extractRolesFromToken(token: string): any | null {
		try {
			const decodedToken: any = this.jwtService.decode(token);
			return decodedToken.roles;
		} catch (error) {
			return null;
		}
	}
}
