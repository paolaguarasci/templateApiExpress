import { User, UserType } from './user.entity';
import { IUserBuilder } from './IUserBuilder';

export class UserBuilder implements IUserBuilder {
  private user: User;

  constructor() {
    this.reset();
  }

  public reset(): void {
    this.user = new User();
  }

  public setId(id: string): void {
    this.user.id = id;
  }

  public setUsername(username: string): void {
    this.user.username = username;
  }

  public setHash(hash: string): void {
    this.user.hash = hash;
  }

  public async setPassword(password: string): Promise<void> {
    this.user.hash = await this.user.createHashPassword(password);
  }

  public setRoles(roles: UserType[]): void {
    this.user.roles = roles;
  }

  public setToken(token: string): void {
    this.user.token = token;
  }

  public setTokenToRenew(token: string): void {
    this.user.tokenToRenew = token;
  }

  public getUser(): User {
    const result = this.user;
    this.reset();
    return result;
  }
}
