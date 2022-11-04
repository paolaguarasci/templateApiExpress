import { Test, TestingModule } from '@nestjs/testing';
import { User, UserType } from './entities/user.entity';

import { UserBuilder } from './entities/UserBuilder';
import { UserDirector } from './entities/UserDirector';
import { UserListToTest } from '../../test/UserListToTest';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  const userDirector: UserDirector = new UserDirector();
  const userBuilder: UserBuilder = new UserBuilder();
  const userListToTest: UserListToTest = new UserListToTest(
    userBuilder,
    userDirector,
  );
  let userList: User[];
  const rightUsername = 'paola-admin';
  const rightPassword = 'PaolettA.85@#';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, UserBuilder, UserDirector],
    }).compile();

    service = module.get<UsersService>(UsersService);
    await service.init();
    await userListToTest.init();
    userList = await userListToTest.getUserList();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users = service.findAll();
      const usersNoHash = userList.map((user) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { hash, ...userNoHash } = user;
        return userNoHash;
      });
      expect(users).toMatchObject(usersNoHash);
    });

    it('should returned array have length 3', async () => {
      expect(service.findAll()).toHaveLength(3);
    });
  });

  describe('findOne', () => {
    it('should return a user', async () => {
      const user: User = userList.find((user) => user.id === '2')!;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { hash, ...userNoHash } = user;
      expect(await service.findOne('2')).toMatchObject(userNoHash);
    });

    it('should throw an error if the request id is not present', async () => {
      expect(() => {
        service.findOne('10');
      }).toThrowError('User not present');
    });
  });

  describe('create', () => {
    it('should return a created user', async () => {
      const newUserObj = { username: 'ciaociao', password: 'PaolettA.85@#' };

      await userDirector.buildNewUser(
        '4',
        newUserObj.username,
        newUserObj.password,
      );

      const newUser = userBuilder.getUser();

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { hash, ...userNoHash } = newUser;

      expect(
        await service.create(newUserObj.username, newUserObj.password),
      ).toMatchObject(userNoHash);
    });

    it('should save a create user', async () => {
      await service.create('cicciopasticcio', rightPassword);
      expect(service.findAll()).toHaveLength(userList.length + 1);
    });

    it('should throw an error if the new username are present', async () => {
      await expect(async () => {
        await service.create(rightUsername, rightPassword);
      }).rejects.toThrowError('User already present');
    });
  });

  describe('update', () => {
    it('should return an update user', async () => {
      await userDirector.buildNewUser('1', 'paola-admin', 'PaolettA.85@#', [
        UserType.ADMIN,
      ]);
      const user = userBuilder.getUser();

      await userDirector.buildNewUser(
        user.id,
        'paola-super-admin',
        'PaolettA.85@#',
        user.roles,
      );
      const user1 = userBuilder.getUser();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { hash, ...userNoHash } = user1;
      expect(
        await service.update(user.id, { username: 'paola-super-admin' }),
      ).toMatchObject(userNoHash);
    });

    it('if send new password it should be update', async () => {
      const user = userList[0];

      await userDirector.buildNewUser(
        user.id,
        user.username,
        'Ciaone.123#$%',
        user.roles,
      );
      const user1 = userBuilder.getUser();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { hash, ...userNoHash } = user1;
      expect(
        await service.update(user.id, { password: 'Ciaone.123#$%' }),
      ).toMatchObject(userNoHash);
    });
  });

  describe('remove', () => {
    it('should remove user', async () => {
      await service.remove('1');
      expect(service.findAll()).toHaveLength(userList.length - 1);
    });

    it('should not throw an error if the id is present', async () => {
      expect(() => {
        service.remove('1');
      }).not.toThrow();
    });

    it('should throw an error if the id is not present', async () => {
      expect(() => {
        service.remove('10');
      }).toThrowError('User not present');
    });
  });
});
