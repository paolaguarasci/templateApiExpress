import { User, UserType } from './entities/user.entity';

import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  userList: User[] = [];
  constructor() {
    const user1 = new User('1', 'paola-admin', 'PaolettA.85@#', [
      UserType.ADMIN,
    ]);
    const user2 = new User('2', 'giuseppe-aditor', 'PaolettA.85@#', [
      UserType.EDITOR,
    ]);
    const user3 = new User('3', 'nicola-user', 'PaolettA.85@#', [
      UserType.BASE,
    ]);

    this.userList.push(user1);
    this.userList.push(user2);
    this.userList.push(user3);
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

  create(username: string, password: string): User {
    const lastUserID: string = this.findNextUserID();

    if (this.userList.find((user) => user.username === username) != undefined) {
      throw new Error('User already present');
    }

    const newUser = new User(lastUserID, username, password);
    this.userList.push(newUser);
    return newUser;
  }

  update(id: string, obj: any): User {
    const indexUserToUpdate = this.userList.findIndex((user) => user.id === id);
    const userToUpdate: User = this.userList[indexUserToUpdate];

    if (obj.username) {
      userToUpdate.username = obj.username;
    }

    if (obj.password) {
      userToUpdate.changePassword(obj.password);
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
