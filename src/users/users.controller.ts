import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { GetUserDTO } from './dto/get-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): GetUserDTO[] {
    return this.mapperUserListToDTO(this.usersService.findAll());
  }

  @Get(':id')
  findOne(@Param('id') id: string): GetUserDTO {
    try {
      return this.mapperUserToDTO(this.usersService.findOne(id));
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: err.message,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto): GetUserDTO {
    try {
      return this.mapperUserToDTO(
        this.usersService.create(
          createUserDto.username,
          createUserDto.password,
        ),
      );
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: err.message,
        },
        HttpStatus.CONFLICT,
      );
    }
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): GetUserDTO {
    return this.mapperUserToDTO(
      this.usersService.update(id, {
        username: updateUserDto.username,
        password: updateUserDto.password,
      }),
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.usersService.remove(id);
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: err.message,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  private mapperUserListToDTO(users: User[]): GetUserDTO[] {
    return users.map((user) => this.mapperUserToDTO(user));
  }

  private mapperUserToDTO(user: User): GetUserDTO {
    return new GetUserDTO(
      user.id,
      user.username,
      user.role,
      user.token,
      user.tokenToRenew,
    );
  }
}
