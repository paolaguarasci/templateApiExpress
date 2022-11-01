import { UserType } from './../entities/user.entity';
export class GetUserDTO {
  id: string;
  username: string;
  role: UserType;
  token?: string;
  tokenToRenew?: string;

  constructor(
    id: string,
    username: string,
    role?: UserType,
    token?: string,
    tokenToRenew?: string,
  ) {
    this.id = id;
    this.username = username;
    this.role = role!;
    this.token = token;
    this.tokenToRenew = tokenToRenew;
  }
}
