import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { CreateUserInterceptor } from './interceptors/create-user.inceptor';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAllUsers() {
    return this.usersService.getAll();
  }

  @Post()
  @UseInterceptors(CreateUserInterceptor)
  createUser(@Body() body: CreateUserDto) {
    return this.usersService.create(body);
  }

  @Post('/many')
  createUsers(@Body() body: CreateUserDto[]) {
    return this.usersService.createMany(body);
  }

  @Get('/:id')
  getUser(@Param('id') id: number) {
    return this.usersService.getById(id);
  }
}
