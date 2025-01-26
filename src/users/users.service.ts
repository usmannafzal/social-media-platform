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

  async createMany(data: CreateUserDto[]) {
    const userEntities = data?.map((item) => {
      const user = new User();
      user.name = item.name;
      user.userName = item.username;
      user.email = item.email;
      user.userStreet = item.address.street;
      user.userSuite = item.address.suite;
      user.userCity = item.address.city;
      user.userZipcode = item.address.zipcode;
      user.companyName = item.company.name;
      user.companyCatchPhrase = item.company.catchPhrase;
      user.companyBs = item.company.bs;
      user.userLat = item.address.geo.lat;
      user.userLng = item.address.geo.lng;
      user.phone = item.phone;
      user.website = item.website;
      return user;
    });
    const savedUserEntities = await this.repo.save(userEntities);
    return savedUserEntities.map((user) => this.formatCreateResponse(user));
  }
}
