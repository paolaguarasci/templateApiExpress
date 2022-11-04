import { IUserBuilder } from './IUserBuilder';
import { UserType } from './user.entity';

export class UserDirector {
  private builder: IUserBuilder;

  public setBuilder(builder: IUserBuilder): void {
    this.builder = builder;
  }

  public async buildNewUser(
    id: string,
    username: string,
    password: string,
    roles?: UserType[],
  ): Promise<void> {
    this.builder.setId(id);
    this.builder.setUsername(username);
    this.builder.setRoles(roles ?? [UserType.BASE]);
    await this.builder.setPassword(password);
  }

  public buildExistingUser(
    id: string,
    username: string,
    hash: string,
    roles: UserType[],
    token: string,
    tokenToRenew: string,
  ): void {
    this.builder.setId(id);
    this.builder.setUsername(username);
    this.builder.setRoles(roles);
    this.builder.setHash(hash);
    this.builder.setToken(token);
    this.builder.setTokenToRenew(tokenToRenew);
  }
}
