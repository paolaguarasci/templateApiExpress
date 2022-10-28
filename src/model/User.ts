import { RoleType } from './RoleType';

export class User {
  readonly username: string;
  hash: string;
  token: string;
  role: RoleType;

  constructor(username: string, hash: string, token: string, role: RoleType) {
    this.username = this.sanitizeAndValidateUsername(username);
    this.hash = hash;
    this.token = token;
    this.role = role;
  }

  private sanitizeAndValidateUsername(username: string): string {
    username = username.trim();
    let usernameRegExp = /^[A-Za-z0-9_]{8,16}$/;
    if (username.length < 8 || username.length > 16)
      throw new Error('Username invalid');
    if (!usernameRegExp.test(username)) throw new Error('Username invalid');
    return username;
  }
}
