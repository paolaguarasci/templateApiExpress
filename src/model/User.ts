import { Column, Entity, Generated, PrimaryColumn } from 'typeorm';

import { RoleType } from './RoleType.js';

@Entity()
export class User {
  @Column()
  username?: string;
  @Column()
  hash?: string;
  @Column()
  token?: string;
  @Column({
    type: 'enum',
    enum: RoleType,
    default: RoleType.User
  })
  role?: RoleType;

  @PrimaryColumn()
  @Generated('uuid')
  id?: string;

  // constructor(
  //   username: string,
  //   hash: string,
  //   token: string,
  //   role: RoleType,
  //   id?: string
  // ) {
  //   this.id = id;
  //   this.username = this.sanitizeAndValidateUsername(username);
  //   this.hash = hash;
  //   this.token = token;
  //   this.role = role;
  // }

  // private sanitizeAndValidateUsername(username: string): string {
  //   username = username.trim();
  //   const usernameRegExp = /^[A-Za-z0-9_]{8,16}$/;
  //   if (username.length < 8 || username.length > 16)
  //     throw new Error('Username invalid');
  //   if (!usernameRegExp.test(username)) throw new Error('Username invalid');
  //   return username;
  // }
}
