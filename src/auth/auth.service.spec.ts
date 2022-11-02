import { Test, TestingModule } from '@nestjs/testing';
import { User, UserType } from '../users/entities/user.entity';

import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { UnauthorizedException } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { jwtConstants } from './constants';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;
  const userList: User[] = [
    new User('1', 'paola-admin', 'PaolettA.85@#', UserType.ADMIN),
    new User('2', 'giuseppe-aditor', 'PaolettA.85@#', UserType.EDITOR),
    new User('3', 'nicola-user', 'PaolettA.85@#', UserType.BASE),
  ];

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
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validate', () => {
    it('return user if credentials are correct', async () => {
      jest
        .spyOn(usersService, 'findOneByUsername')
        .mockReturnValue(userList[0]);
      let { hash, ...result } = userList[0];
      expect(
        await service.validateUser(userList[0].username, 'PaolettA.85@#'),
      ).toStrictEqual(result);
    });

    it('should return null when password are invalid', async () => {
      const res = await service.validateUser(userList[0].username, 'xxx');
      expect(res).toBeNull();
    });

    it('should throw error when username are invalid', async () => {
      await expect(async () => {
        await service.validateUser('xxx', 'xxx')
      }).rejects.toThrowError(UnauthorizedException);
    });
  });

  describe('validateLogin', () => {
    it('should return JWT object when credentials are valid', async () => {
      const res = await service.login({ username: 'maria', userId: 3 });
      expect(res.token).toBeDefined();
    });
  });
});
