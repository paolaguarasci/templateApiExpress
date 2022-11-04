import { Test, TestingModule } from '@nestjs/testing';

import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { User } from '../users/entities/user.entity';
import { UserBuilder } from '../users/entities/UserBuilder';
import { UserDirector } from '../users/entities/UserDirector';
import { UserListToTest } from '../../test/UserListToTest';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { jwtConstants } from './constants';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;

  const userDirector: UserDirector = new UserDirector();
  const userBuilder: UserBuilder = new UserBuilder();
  const userListToTest: UserListToTest = new UserListToTest(
    userBuilder,
    userDirector,
  );
  let userList: User[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        UsersModule,
        PassportModule,
        ConfigModule,
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '60s' },
        }),
      ],
      providers: [AuthService, LocalStrategy, JwtStrategy],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);

    await usersService.init();
    await userListToTest.init();
    userList = await userListToTest.getUserList();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validate', () => {
    it('return user if credentials are correct', async () => {
      jest
        .spyOn(usersService, 'findOneByUsername')
        .mockReturnValue(userList[0]);
      const { hash, ...result } = userList[0]; // eslint-disable-line @typescript-eslint/no-unused-vars
      const res = await service.validateUser('paola-admin', 'PaolettA.85@#');
      await expect(res).toStrictEqual(result);
    });

    it('should return null when password are invalid', async () => {
      const res = await service.validateUser('paola-admin', 'xxx');
      await expect(res).toBeNull();
    });

    // it('should throw error when username are invalid', async () => {
    //   await expect(async () => {
    //     await service.validateUser('xxx', 'xxx');
    //   }).rejects.toThrowError(UnauthorizedException);
    // });
  });

  describe('validateLogin', () => {
    it('should return JWT object when credentials are valid', async () => {
      const res = await service.login({ username: 'maria', userId: 3 });
      expect(res.token).toBeDefined();
    });
  });
});
