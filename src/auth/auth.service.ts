import { Injectable, UnauthorizedException } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    try {
      const user = await this.usersService.findOneByUsername(username);
      if (await user.checkPassword(pass)) {
        const { hash, ...result } = user; // eslint-disable-line @typescript-eslint/no-unused-vars
        return result;
      }
      return null;
    } catch (err) {
      throw new UnauthorizedException();
    }
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
