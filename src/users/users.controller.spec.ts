import { Test, TestingModule } from '@nestjs/testing';
import { User, UserType } from './entities/user.entity';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;
  let userList: User[] = [
    new User('1', 'paola', '123456', UserType.ADMIN),
    new User('2', 'giuseppe', '123123', UserType.EDITOR),
    new User('3', 'nicola', '123321', UserType.BASE),
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

  describe("findAll", () => {
    it("return all users", async () => {
      jest.spyOn(service, 'findAll').mockImplementation(() => new Promise((resolve, reject) => {
        resolve(userList);
      }));
      expect(await controller.findAll()).toStrictEqual(userList);
    })
    it("return 3 users", async () => {
      jest.spyOn(service, 'findAll').mockImplementation(() => new Promise((resolve, reject) => {
        resolve(userList);
      }));
      expect(await controller.findAll()).toHaveLength(userList.length);
    })

    it("call service findAll", async () => {
      jest.spyOn(service, 'findAll').mockImplementation(() => new Promise((resolve, reject) => {
        resolve(userList);
      }));
      controller.findAll();
      expect(service.findAll).toHaveBeenCalledTimes(1);
    })
  })

  describe("findOne", () => {
    it("call service findAll", async () => {
      jest.spyOn(service, 'findOne').mockReturnValue(userList[0])
      controller.findOne("1");
      expect(service.findOne).toHaveBeenCalledTimes(1);
    })
    it("return the user with id searched", async () => {
      let user = userList[0]
      jest.spyOn(service, 'findOne').mockReturnValue(userList[0])
      expect(controller.findOne(user.id).id).toBe(user.id);
    })
  })

});
