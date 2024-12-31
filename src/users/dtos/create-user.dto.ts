import { IsDefined, IsEmail, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class Geo {
  @IsDefined()
  @IsString()
  lat: string;

  @IsDefined()
  @IsString()
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
  @IsString()
  zipcode: string;

  @IsDefined()
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
