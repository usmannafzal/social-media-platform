import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'user_name' })
  userName: string;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'user_street' })
  userStreet: string;

  @Column({ name: 'user_suite' })
  userSuite: string;

  @Column({ name: 'user_city' })
  userCity: string;

  @Column({ name: 'user_zipcode' })
  userZipcode: number;

  @Column({ name: 'user_lat' })
  userLat: number;

  @Column({ name: 'user_lng' })
  userLng: number;

  @Column({ name: 'phone' })
  phone: string;

  @Column({ name: 'website' })
  website: string;

  @Column({ name: 'company_name' })
  companyName: string;

  @Column({ name: 'company_catch_phrase' })
  companyCatchPhrase: string;

  @Column({ name: 'company_bs' })
  companyBs: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;
}
