import { Test, TestingModule } from '@nestjs/testing';
import { User, UserType } from './entities/user.entity';

import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  const userList: User[] = [
    new User('1', 'paola-admin', 'PaolettA.85@#', [UserType.ADMIN]),
    new User('2', 'giuseppe-aditor', 'PaolettA.85@#', [UserType.EDITOR]),
    new User('3', 'nicola-user', 'PaolettA.85@#', [UserType.BASE]),
  ];

  const rightUsername = 'paola-admin';
  const rightPassword = 'PaolettA.85@#';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users = await service.findAll();
      expect(users).toMatchObject(userList);
    });

    it('should returned array have length 3', async () => {
      expect(await service.findAll()).toHaveLength(3);
    });
  });

  describe('findOne', () => {
    it('should return a user', async () => {
      expect(await service.findOne('2')).toStrictEqual(
        userList.find((user) => user.id === '2'),
      );
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
      const newUser = new User('4', newUserObj.username, newUserObj.password);
      expect(
        await service.create(newUserObj.username, newUserObj.password),
      ).toStrictEqual(newUser);
    });

    it('should save a create user', async () => {
      await service.create('cicciopasticcio', rightPassword);
      expect(await service.findAll()).toHaveLength(userList.length + 1);
    });

    it('should throw an error if the new username are present', async () => {
      expect(() => {
        service.create(rightUsername, rightPassword);
      }).toThrowError('User already present');
    });
  });

  describe('update', () => {
    it('should return an update user', async () => {
      const user = new User('1', 'paola-admin', 'PaolettA.85@#', [
        UserType.ADMIN,
      ]);
      expect(
        await service.update(user.id, { username: 'paola-super-admin' }),
      ).toMatchObject(
        new User(user.id, 'paola-super-admin', 'PaolettA.85@#', user.roles),
      );
    });

    it('if send new password it should be update', async () => {
      const user = userList[0];
      expect(
        await service.update(user.id, { password: 'Ciaone.123#$%' }),
      ).toMatchObject(
        new User(user.id, user.username, 'Ciaone.123#$%', user.roles),
      );
    });
  });

  describe('remove', () => {
    it('should remove user', async () => {
      await service.remove('1');
      expect(await service.findAll()).toHaveLength(userList.length - 1);
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
