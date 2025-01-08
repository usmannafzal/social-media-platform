import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  saltOrRounds: number;
  constructor(@InjectRepository(User) private repo: Repository<User>) {
    this.saltOrRounds = 10;
  }
  create(data: CreateUserDto) {
    const user = new User();
  }
}
