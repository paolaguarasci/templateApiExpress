import { User } from '../model/User.js';

export default class UserRepository {
  userList: User[];

  constructor() {
    this.userList = [];
  }

  async getAll() {
    return await [];
  }
  async getById(id: string) {
    return await this.userList.find((user) => user.id === id);
  }
  async create(user: User) {
    return await this.userList.push(user);
  }
  async edit(user: User) {
    const indexToReplace = this.userList.findIndex((u) => u.id === user.id);
    this.userList[indexToReplace] = user;
    return this.userList[indexToReplace];
  }
  async delete(id: string) {
    return await this.userList.filter((u) => u.id != id);
  }
}
