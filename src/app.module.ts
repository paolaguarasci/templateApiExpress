import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { UtilsService } from './utils/utils.service';
import { UtilsModule } from './utils/utils.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    AuthModule,
    UsersModule,
    UtilsModule,
  ],
  controllers: [AppController],
  providers: [AppService, UtilsService],
})
export class AppModule {}
