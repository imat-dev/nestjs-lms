import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  public async getToken(user: User): Promise<string> {
    //this will be the payload
    // .sub is most common name for storing id
    // token will return {email, sub, iat, eat} iat and eat are token created time and epiration time
    const token = this.jwtService.sign({
      email: user.email,
      roles: user.roles,
      sub: user._id,     // .sub is most common name for storing id
    });

    return token;
  }

  public async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  public async comparePassword(
    password: string,
    hashPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashPassword);
  }

}
