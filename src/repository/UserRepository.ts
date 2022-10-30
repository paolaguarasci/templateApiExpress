import { User } from '../model/User.js';

export default class UserRepository {
  userList: User[];

  constructor() {
    this.userList = [];
  }

  getAll() {}
  getById(id: string) {}
  create(user: User) {}
  edit(user: User) {}
  delete(id: string) {}
}
