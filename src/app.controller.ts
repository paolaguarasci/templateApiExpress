import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { Public } from './app.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private authService: AuthService) {}

  @Public()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req: ExpressRequest) {
    return this.authService.login(req.user);
  }

  @Get('profile')
  getProfile(@Request() req: ExpressRequest) {
    return req.user;
  }
}
