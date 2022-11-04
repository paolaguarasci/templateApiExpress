import { UtilsService } from '../../utils/utils.service';

export enum UserType {
  ADMIN = 'ADMIN',
  EDITOR = 'EDITOR',
  BASE = 'BASE',
}
export class User {
  id: string;
  username: string;
  hash: string;
  roles: UserType[];
  token?: string;
  tokenToRenew?: string;

  public async changePassword(password: string): Promise<void> {
    this.hash = await this.createHashPassword(password);
  }

  async createHashPassword(password: string): Promise<string> {
    return await UtilsService.hashString(password);
  }

  async checkPassword(candidatePassword: string): Promise<boolean> {
    return await UtilsService.checkHash(candidatePassword, this.hash);
  }

  public static sanitizeUsername(username: string): string {
    // TODO
    return username;
  }

  public static validateUsername(username: string): boolean {
    // TODO
    console.log('username ', username);
    return true;
  }
}
