import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async create(data: CreateUserDto) {
    const userEntity = plainToInstance(User, {
      ...data,
      userName: data.username,
      userStreet: data.address.street,
      userSuite: data.address.suite,
      userCity: data.address.city,
      userZipcode: data.address.zipcode,
      userLat: data.address.geo.lat,
      userLng: data.address.geo.lng,
      companyName: data.company.name,
      companyCatchPhrase: data.company.catchPhrase,
      companyBs: data.company.bs,
    });

    const savedUser = await this.repo.save(userEntity);

    return plainToInstance(CreateUserDto, {
      name: savedUser.name,
      username: savedUser.userName,
      email: savedUser.email,
      address: {
        street: savedUser.userStreet,
        suite: savedUser.userSuite,
        city: savedUser.userCity,
        zipcode: savedUser.userZipcode,
        geo: {
          lat: savedUser.userLat,
          lng: savedUser.userLng,
        },
      },
      company: {
        name: savedUser.companyName,
        catchPhrase: savedUser.companyCatchPhrase,
        bs: savedUser.companyBs,
      },
    });
  }
}
