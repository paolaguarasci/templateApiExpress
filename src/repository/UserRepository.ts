import { AppDataSource } from '../config/dataSource.js';
import { User } from '../model/User.js';
export class UserRepository {
  userList: User[] = [];

  public getAll = async () => {
    return await AppDataSource.getRepository(User).find();
  };

  public getById = async (id: string) => {
    return await AppDataSource.getRepository(User).findOneBy({ id: id });
  };

  public create = async (user: User) => {
    const newUser = await AppDataSource.getRepository(User).create(user);
    return await AppDataSource.getRepository(User).save(newUser);
  };

  public edit = async (id: string, user: User) => {
 console.log("user ", user);
    const userFromDB = await AppDataSource.getRepository(User).findOneBy({
      id: id
    });
    if (userFromDB === null) throw new Error('User not present');
    AppDataSource.getRepository(User).merge(userFromDB, user);
    return await AppDataSource.getRepository(User).save(user);
  };

  public delete = async (id: string) => {
    return await AppDataSource.getRepository(User).delete(id);
  };
}
