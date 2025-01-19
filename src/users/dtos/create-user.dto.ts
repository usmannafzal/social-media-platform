import {
  IsDefined,
  IsEmail,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class Geo {
  @IsDefined()
  @IsNumber()
  lat: string;

  @IsDefined()
  @IsNumber()
  lng: string;
}

class Address {
  @IsDefined()
  @IsString()
  street: string;

  @IsDefined()
  @IsString()
  suite: string;

  @IsDefined()
  @IsString()
  city: string;

  @IsDefined()
  @IsNumber()
  zipcode: number;

  @IsDefined()
  @ValidateNested()
  @Type(() => Geo)
  geo: Geo;
}

class Company {
  @IsDefined()
  @IsString()
  name: string;

  @IsDefined()
  @IsString()
  catchPhrase: string;

  @IsDefined()
  @IsString()
  bs: string;
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

  @IsDefined()
  @ValidateNested()
  @Type(() => Company)
  company: Company;
}
