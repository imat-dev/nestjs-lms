import { Injectable } from '@nestjs/common';

@Injectable()
export class GuardService {
	public extractTokenFromHeaders(request: any): string | null {
		const authHeader = request.headers.authorization;
		if (authHeader && authHeader.startsWith('Bearer ')) {
			return authHeader.slice(7); // Extract token from "Bearer [token]"
		}
		return null;
	}
}
