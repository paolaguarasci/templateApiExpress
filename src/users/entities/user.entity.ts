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

  constructor(
    id: string,
    username: string,
    password: string,
    roles?: UserType[],
  ) {
    this.id = id;
    this.username = username;
    this.hash = this.createHashPassword(password);
    this.roles = roles ?? [UserType.BASE];
  }

  changePassword(password: string): void {
    this.hash = this.createHashPassword(password);
  }

  createHashPassword(password: string): string {
    return this.hashString(password);
  }

  checkPassword(candidatePassword: string): boolean {
    return this.hashString(candidatePassword) === this.hash;
  }

  private hashString(value: string): string {
    // TODO
    return value + '-hashed';
  }

  sanitizeUsername(username: string): string {
    // TODO
    return username;
  }

  validateUsername(username: string): boolean {
    // TODO
    console.log(username);
    return true;
  }
}

// export interface IUserBuilder {
//   setId(id: string): void;
//   setUsername(username: string): void;
//   setPassword(password: string): void;
//   setHash(hash: string): void;
//   setRole(role: UserType): void;
//   setToken(token: string): void;
//   setTokenToRenew(tokenToRenew: string): void;
// }

// export class UserBuilder implements IUserBuilder {
//   private user: User;

//   constructor() {
//     this.reset();
//   }

//   public reset(): void {
//     this.user = new User();
//   }

//   public get(): User {
//     const result = this.user;
//     this.reset();
//     return result;
//   }

//   setId(id: string): UserBuilder {
//     this.user.id = id;
//     return this;
//   }

//   setUsername(username: string): UserBuilder {
//     this.user.username = username;
//     return this;
//   }

//   setPassword(password: string): UserBuilder {
//     this.user.changePassword(password);
//     return this;
//   }

//   setHash(hash: string): UserBuilder {
//     this.user.hash = hash;
//     return this;
//   }

//   setRole(role: UserType): UserBuilder {
//     this.user.role = role;
//     return this;
//   }

//   setToken(token: string): UserBuilder {
//     this.user.token = token;
//     return this;
//   }

//   setTokenToRenew(tokenToRenew: string): UserBuilder {
//     this.user.tokenToRenew = tokenToRenew;
//     return this;
//   }
// }
