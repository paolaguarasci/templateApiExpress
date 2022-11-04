import { UserType } from './user.entity';

export interface IUserBuilder {
  setId(id: string): void;
  setUsername(username: string): void;
  setHash(hash: string): void;
  setRoles(roles: UserType[]): void;
  setToken(token: string): void;
  setTokenToRenew(token: string): void;

  setPassword(password: string): void;
}
