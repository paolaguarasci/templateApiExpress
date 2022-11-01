import { Test, TestingModule } from '@nestjs/testing';
import { User, UserType } from './entities/user.entity';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let userList: User[] = [
    new User('1', 'paola', '123456', UserType.ADMIN),
    new User('2', 'giuseppe', '123123', UserType.EDITOR),
    new User('3', 'nicola', '123321', UserType.BASE),
  ];

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
      expect(await service.findAll()).toStrictEqual(userList);
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
      let newUserDTO = new CreateUserDto('paola1', '123321');
      let newUser = new User('4', 'paola1', '123321');
      expect(await service.create(newUserDTO)).toStrictEqual(newUser);
    });

    it('should save a create user', async () => {
      let newUser = new CreateUserDto('pippo', '123321');
      await service.create(newUser);
      expect(await service.findAll()).toHaveLength(userList.length + 1);
    });

    it('should throw an error if the new username are present', async () => {
      let newUser = new CreateUserDto('paola', '123321');
      expect(() => {
        service.create(newUser);
      }).toThrowError('User already present');
    });
  });

  describe('update', () => {
    it('should return an update user', async () => {
      let user = userList[0];
      let userUpdated = { ...user, username: 'cicciopasticcio' };
      let userUpdateDTO = new UpdateUserDto();
      userUpdateDTO.username = 'cicciopasticcio';
      expect(await service.update(user.id, userUpdateDTO)).toMatchObject(
        userUpdated,
      );
    });

    it('if send new password it should be update', async () => {
      let user = userList[0];
      let userUpdated = { ...user, hash: 'ciaone-hashed' };
      let userUpdateDTO = new UpdateUserDto();
      userUpdateDTO.password = 'ciaone';
      expect(await service.update(user.id, userUpdateDTO)).toMatchObject(
        userUpdated,
      );
    });
  });

  describe('remove', () => {
    it('should remove user', async () => {
      await service.remove("1")
      expect(await service.findAll()).toHaveLength(userList.length - 1);
    });

    it('should not throw an error if the id is present', async () => {
      expect(() => {
        service.remove("1");
      }).not.toThrow();
    });

    it('should throw an error if the id is not present', async () => {
      expect(() => {
        service.remove("10");
      }).toThrowError('User not present');
    });
  });

});
