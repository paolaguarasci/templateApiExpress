import { UserType } from './../entities/user.entity';
export class GetUserDTO {
  id: string;
  username: string;
  roles: UserType[];
  token?: string;
  tokenToRenew?: string;

  constructor(
    id: string,
    username: string,
    roles?: UserType[],
    token?: string,
    tokenToRenew?: string,
  ) {
    this.id = id;
    this.username = username;
    this.roles = roles!;
    this.token = token;
    this.tokenToRenew = tokenToRenew;
  }
}
