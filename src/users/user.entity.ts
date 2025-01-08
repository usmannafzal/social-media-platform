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

  @Column({ name: 'is_active', default: true })
  isActive: boolean;
}
