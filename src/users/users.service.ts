import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async getAll(page?: number) {
    const paginationSize = 10;

    if (!page) return this.repo.find();

    const data = await this.repo.findAndCount({
      skip: (page - 1) * paginationSize,
      take: paginationSize,
    });
    return data;
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

    return this.repo.save(userEntity);
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
    return this.repo.save(userEntities);
  }

  async getById(id: number) {
    try {
      return await this.repo.findOneOrFail({ where: { id } });
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      throw error;
    }
  }
}
