import { Test, TestingModule } from '@nestjs/testing';
import { User, UserType } from './entities/user.entity';

import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDTO } from './dto/get-user.dto';
import { HttpException } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;
  const userList: User[] = [
    new User('1', 'paola-admin', 'PaolettA.85@#', UserType.ADMIN),
    new User('2', 'giuseppe-aditor', 'PaolettA.85@#', UserType.EDITOR),
    new User('3', 'nicola-user', 'PaolettA.85@#', UserType.BASE),
  ];

  const userListGetDTO: GetUserDTO[] = [
    new GetUserDTO('1', 'paola-admin', UserType.ADMIN),
    new GetUserDTO('2', 'giuseppe-aditor', UserType.EDITOR),
    new GetUserDTO('3', 'nicola-user', UserType.BASE),
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('return all users', async () => {
      jest.spyOn(service, 'findAll').mockImplementation(() => userList);
      expect(await controller.findAll()).toStrictEqual(userListGetDTO);
    });

    it('return 3 users', async () => {
      jest.spyOn(service, 'findAll').mockImplementation(() => userList);
      expect(await controller.findAll()).toHaveLength(userListGetDTO.length);
    });

    it('call service findAll', async () => {
      jest.spyOn(service, 'findAll').mockImplementation(() => userList);
      controller.findAll();
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('call service findOne', async () => {
      jest.spyOn(service, 'findOne').mockReturnValue(userList[0]);
      controller.findOne('1');
      expect(service.findOne).toHaveBeenCalledTimes(1);
    });
    it('return the user with id searched', async () => {
      const user = userList[0];
      jest.spyOn(service, 'findOne').mockReturnValue(userList[0]);
      expect(controller.findOne(user.id).id).toBe(user.id);
    });

    it('return error message if user not present', async () => {
      jest.spyOn(service, 'findOne').mockImplementation(() => {
        throw new Error('User not present');
      });
      expect(() => {
        controller.findOne('10');
      }).toThrowError(HttpException);
    });
  });

  describe('create', () => {
    it('call service create', async () => {
      jest.spyOn(service, 'create').mockReturnValue(userList[0]);
      controller.create(new CreateUserDto('paola-admin', 'PaolettA85@#'));
      expect(service.create).toHaveBeenCalledTimes(1);
    });

    it('return error message if username is already present', async () => {
      jest.spyOn(service, 'create').mockImplementation(() => {
        throw new Error('User alredy present');
      });
      expect(() =>
        controller.create(new CreateUserDto('paola-admin', 'PaolettA.85')),
      ).toThrowError(HttpException);
    });

    it('return error message if dto is wrong', async () => {
      jest.spyOn(service, 'create').mockImplementation(() => {
        throw new Error('Invalid parameter(s)');
      });
      expect(() =>
        controller.create(new CreateUserDto('', 'PaolettA.85')),
      ).toThrowError('Invalid username');
      expect(() =>
        controller.create(new CreateUserDto('paola-admin', '')),
      ).toThrowError('Invalid password');
    });
  });

  describe('remove', () => {
    it('call service remove', async () => {
      jest.spyOn(service, 'remove').mockReturnValue();
      controller.remove('1');
      expect(service.remove).toHaveBeenCalledTimes(1);
    });

    it('return error message if id is not present', async () => {
      jest.spyOn(service, 'remove').mockImplementation(() => {
        throw new Error('User not present');
      });
      expect(() => controller.remove('123')).toThrowError(HttpException);
    });
  });
});
