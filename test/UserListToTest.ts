import { User, UserType } from '../src/users/entities/user.entity';

import { UserBuilder } from '../src/users/entities/UserBuilder';
import { UserDirector } from '../src/users/entities/UserDirector';

export class UserListToTest {
  userList: User[];

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

  public async getUserList(): Promise<User[]> {
    const r = this.userList;
    this.userList = [];
    return r;
  }
}
