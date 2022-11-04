import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { ROLES_KEY } from './role.decorator';
import { Reflector } from '@nestjs/core';
import { UserType } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private usersService: UsersService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserType[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    const userDb = this.usersService.findOneByUsername(user.username);
    return requiredRoles.some((role) => userDb.roles?.includes(role));
  }
}
