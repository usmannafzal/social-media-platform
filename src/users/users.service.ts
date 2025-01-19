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
    user.name = data.name;
    user.userName = data.username;
    user.email = data.email;
    user.userStreet = data.address.street;
    user.userSuite = data.address.suite;
    user.userCity = data.address.city;
    user.userZipcode = data.address.zipcode;
    user.companyName = data.company.name;
    user.companyCatchPhrase = data.company.catchPhrase;
    user.companyBs = data.company.bs;
    return this.repo.save(user);
  }
}
