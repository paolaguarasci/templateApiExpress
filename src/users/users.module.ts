import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Module } from '@nestjs/common';
import { RolesGuard } from '../auth/roles.guard';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UtilsModule } from '../utils/utils.module';
import { UserBuilder } from './entities/UserBuilder';
import { UserDirector } from './entities/UserDirector';

@Module({
  controllers: [UsersController],
  imports: [UtilsModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    UsersService,
    UserBuilder,
    UserDirector,
  ],
  exports: [UsersService],
})
export class UsersModule {}
