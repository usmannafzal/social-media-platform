import { plainToInstance } from 'class-transformer';
import { CreateUserDto } from '../dtos/create-user.dto';

export default class FormatHelpers {
  static formatCreateResponse(user: any) {
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
}
