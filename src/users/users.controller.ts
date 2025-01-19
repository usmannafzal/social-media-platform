import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAllUsers() {
    return 'this is the list of all users';
  }

  @Post()
  createUser(@Body() body: CreateUserDto) {
    this.usersService.create(body);
  }
}
