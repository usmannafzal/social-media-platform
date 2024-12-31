import { IsDefined, IsEmail, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class Geo {
  @IsString()
  lat: string;

  @IsString()
  lng: string;
}

class Address {
  @IsString()
  street: string;

  @IsString()
  suite: string;

  @IsString()
  city: string;

  @IsString()
  zipcode: string;

  @ValidateNested()
  @Type(() => Geo)
  geo: Geo;
}

export class CreateUserDto {
  @IsDefined()
  @IsString()
  name: string;

  @IsDefined()
  @IsString()
  username: string;

  @IsDefined()
  @IsEmail()
  email: string;

  @IsDefined()
  @ValidateNested()
  @Type(() => Address)
  address: Address;
}
