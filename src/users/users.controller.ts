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
import { User, UserType } from './entities/user.entity';
import { GetUserDTO } from './dto/get-user.dto';
import { Roles } from '../auth/role.decorator';

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
  @Roles(UserType.ADMIN)
  async create(@Body() createUserDto: CreateUserDto): Promise<GetUserDTO> {
    try {
      const users = await this.usersService.create(
        createUserDto.username,
        createUserDto.password,
      );
      return this.mapperUserToDTO(users);
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
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<GetUserDTO> {
    const user = await this.usersService.update(id, {
      username: updateUserDto.username,
      password: updateUserDto.password,
    });
    return this.mapperUserToDTO(user);
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
      user.roles,
      user.token,
      user.tokenToRenew,
    );
  }
}
