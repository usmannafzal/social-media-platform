import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { CreateUserInterceptor } from './interceptors/create-user.interceptor';
import { CreateManyInterceptor } from './interceptors/create-many.interceptor';
import { GetPaginatedInterceptor } from './interceptors/get-paginated.interceptor';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseInterceptors(GetPaginatedInterceptor)
  getAllUsers(@Query('page') page?: number) {
    return this.usersService.getAll(page);
  }

  @Post()
  @UseInterceptors(CreateUserInterceptor)
  createUser(@Body() body: CreateUserDto) {
    return this.usersService.create(body);
  }

  @Post('/many')
  @UseInterceptors(CreateManyInterceptor)
  createUsers(@Body() body: CreateUserDto[]) {
    return this.usersService.createMany(body);
  }

  @Get('/:id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getById(id);
  }
}
