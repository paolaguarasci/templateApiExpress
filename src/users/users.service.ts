import { User, UserType } from './entities/user.entity';

import { CreateUserDto } from './dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { find } from 'rxjs';

@Injectable()
export class UsersService {
  userList: User[] = [];
  constructor() {
    let user1 = new User('1', 'paola', '123456', UserType.ADMIN);
    let user2 = new User('2', 'giuseppe', '123123', UserType.EDITOR);
    let user3 = new User('3', 'nicola', '123321', UserType.BASE);

    this.userList.push(user1);
    this.userList.push(user2);
    this.userList.push(user3);
  }

  findAll(): Promise<User[] | void[]> {
    return new Promise((resolve, reject) => {
      resolve(this.userList);
    });
  }
  findOne(id: string) {
    let user = this.userList.find((user) => user.id === id);
    if (user) {
      return user;
    } else {
      throw new Error('User not present');
    }
  }
  create(createUserDto: CreateUserDto) {
    let lastUserID = '4';

    if (
      this.userList.find((user) => user.username === createUserDto.username) !=
      undefined
    ) {
      throw new Error('User already present');
    }

    let newUser = new User(
      lastUserID,
      createUserDto.username,
      createUserDto.password,
    );
    this.userList.push(newUser);
    return newUser;
  }
  update(id: string, updateUserDto: UpdateUserDto) {
    let indexUserToUpdate = this.userList.findIndex((user) => user.id === id);
    let userToUpdate = this.userList[indexUserToUpdate];

    if (updateUserDto.username) {
      userToUpdate.username = updateUserDto.username;
    }
    if (updateUserDto.password) {
      userToUpdate.changePassword(updateUserDto.password);
    }

    this.userList.splice(indexUserToUpdate, 1, userToUpdate);
    return userToUpdate;
  }
  remove(id: string) {
    this.findOne(id);
    this.userList = this.userList.filter((user) => user.id != id);
  }
}
