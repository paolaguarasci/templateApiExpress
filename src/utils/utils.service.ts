import * as bcrypt from 'bcrypt';

import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilsService {
  static saltOrRounds = 10;

  static async hashString(value: string): Promise<string> {
    return await bcrypt.hash(value, this.saltOrRounds);
  }
  static async checkHash(password: string, hash: string): Promise<boolean> {
    const res = await bcrypt.compare(password, hash);
    return res;
  }

  static async genHashSalt(): Promise<string> {
    return await bcrypt.genSalt();
  }
}
