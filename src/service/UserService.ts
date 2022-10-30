import { User } from 'src/model/User';
import UserRepository from '../repository/UserRepository.js';

export default class UserService {
  userRepository: UserRepository;

  constructor() {
    this.userRepository  = new UserRepository();
  }

  getAll() {
    return this.userRepository.getAll();
  }
  getById(id: string) {
    return this.userRepository.getById(id);
  }
  create(user: User) {
    return this.userRepository.create(user);
  }
  edit(user: User) {
    return this.userRepository.edit(user);
  }
  delete(id: string) {
    return this.userRepository.delete(id);
  }
}
