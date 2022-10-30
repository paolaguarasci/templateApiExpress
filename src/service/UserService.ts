import { User } from '../model/User.js';
import { UserRepository } from '../repository/UserRepository.js';

export class UserService {
  userRepository: UserRepository = new UserRepository();

  public getAll = async () => {
    return await this.userRepository.getAll();
  };
  public getById = async (id: string) => {
    return await this.userRepository.getById(id);
  };
  public create = async (user: User) => {
    return await this.userRepository.create(user);
  };
  public edit = async (id: string, user: User) => {
    return await this.userRepository.edit(id, user);
  };
  public delete = async (id: string) => {
    return await this.userRepository.delete(id);
  };
}
