import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  formatCreateResponse(user: any) {
    return plainToInstance(CreateUserDto, {
      id: user.id,
      name: user.name,
      username: user.userName,
      email: user.email,
      address: {
        street: user.userStreet,
        suite: user.userSuite,
        city: user.userCity,
        zipcode: user.userZipcode,
        geo: {
          lat: user.userLat,
          lng: user.userLng,
        },
      },
      company: {
        name: user.companyName,
        catchPhrase: user.companyCatchPhrase,
        bs: user.companyBs,
      },
    });
  }

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
    return this.formatCreateResponse(savedUser);
  }
}
