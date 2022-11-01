export enum UserType {
  ADMIN = 'ADMIN',
  EDITOR = 'EDITOR',
  BASE = 'BASE',
}
export class User {
  readonly id: string;
  username: string;
  hash: string;
  role: UserType;
  token?: string;
  tokenToRenew?: string;

  constructor(id: string, username: string, password: string, role?: UserType) {
    this.id = id;
    this.username = username;
    this.hash = this.createHashPassword(password);
    this.role = role ?? UserType.BASE;
  }

  changePassword(password: string): void {
    this.hash = this.createHashPassword(password);
  }

  createHashPassword(password: string): string {
    // TODO
    return password + "-hashed";
  }

  checkPassword(candidatePassword: string): boolean {
    // TODO
    return true;
  }

  sanitizeUsername(username: string): string {
    // TODO
    return username;
  }

  validateUsername(username: string): boolean {
    // TODO
    return true;
  }
}
