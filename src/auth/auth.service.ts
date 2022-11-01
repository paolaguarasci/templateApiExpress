import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    try {
      const user = await this.usersService.findOneByUsername(username);     
      if (user && user.checkPassword(pass)) {
        const { hash, ...result } = user;
        return result;
      }
      return null;
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: "Wrong credentials",
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
