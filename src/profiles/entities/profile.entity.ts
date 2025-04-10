import { Auth } from 'src/auth/entities/auth.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Address } from '../v1/embeddables/address.embedded';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ nullable: true })
  profile_image: string;

  @Column({ nullable: true })
  cover_image: string;

  @Column({ nullable: true })
  email: string;

  @Column({ type: 'date', nullable: true })
  date_of_birth: Date;

  @Column({ nullable: true })
  primary_phone_number: string;

  @Column({ nullable: true })
  secondary_phone_number: string;

  @Column(() => Address, { prefix: 'present' })
  present_address: Address;

  @Column(() => Address, { prefix: 'permanent' })
  permanent_address: Address;

  @Column({ nullable: true })
  blood_group: string;

  @Column({ nullable: true })
  nid: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(() => Auth, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: Auth;
}
