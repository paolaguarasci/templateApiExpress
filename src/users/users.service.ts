import { User, UserType } from './entities/user.entity';

import { Injectable } from '@nestjs/common';
import { UserBuilder } from './entities/UserBuilder';
import { UserDirector } from './entities/UserDirector';

@Injectable()
export class UsersService {
  userList: User[] = [];
  constructor(
    private userBuilder: UserBuilder,
    private userDirector: UserDirector,
  ) {}

  async init() {
    this.userDirector.setBuilder(this.userBuilder);

    await this.userDirector.buildNewUser('1', 'paola-admin', 'PaolettA.85@#', [
      UserType.ADMIN,
    ]);
    const user1 = this.userBuilder.getUser();

    await this.userDirector.buildNewUser(
      '2',
      'giuseppe-editor',
      'PaolettA.85@#',
      [UserType.EDITOR],
    );
    const user2 = this.userBuilder.getUser();

    await this.userDirector.buildNewUser('3', 'nicola-user', 'PaolettA.85@#', [
      UserType.BASE,
    ]);
    const user3 = this.userBuilder.getUser();

    this.userList = [user1, user2, user3];
  }

  findAll(): User[] {
    return this.userList;
  }

  findOne(id: string): User {
    const user = this.userList.find((user) => user.id === id);
    if (user) {
      return user;
    } else {
      throw new Error('User not present');
    }
  }

  findOneByUsername(username: string): User {
    const user = this.userList.find((user) => user.username === username);
    if (user) {
      return user;
    } else {
      throw new Error('User not present');
    }
  }

  async create(username: string, password: string): Promise<User> {
    const lastUserID: string = this.findNextUserID();

    const userDB: User | undefined = this.userList.find(
      (user) => user.username === username,
    );

    if (userDB != undefined) {
      throw new Error('User already present');
    }
    await this.userDirector.buildNewUser(lastUserID, username, password);
    const newUser = this.userBuilder.getUser();
    this.userList.push(newUser);
    return newUser;
  }

  async update(id: string, obj: any): Promise<User> {
    const indexUserToUpdate = this.userList.findIndex((user) => user.id === id);
    const userToUpdate: User = this.userList[indexUserToUpdate];

    if (obj.username) {
      userToUpdate.username = obj.username;
    }

    if (obj.password) {
      await userToUpdate.changePassword(obj.password);
    }

    if (obj.role) {
      userToUpdate.roles = obj.roles;
    }

    if (obj.token) {
      userToUpdate.token = obj.token;
    }

    if (obj.tokenToRenew) {
      userToUpdate.tokenToRenew = obj.tokenToRenew;
    }

    this.userList.splice(indexUserToUpdate, 1, userToUpdate);
    return userToUpdate;
  }

  remove(id: string) {
    try {
      this.findOne(id);
      this.userList = this.userList.filter((user) => user.id != id);
    } catch (err) {
      throw err;
    }
  }

  private findNextUserID(): string {
    const lastID = this.userList[this.userList.length - 1].id;
    const nextID = parseInt(lastID, 10) + 1;
    return '' + nextID;
  }
}
