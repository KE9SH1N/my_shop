import { Auth } from 'src/auth/entities/auth.entity';
import { Role } from 'src/roles/entities/role.entity';
import { Address } from 'src/users/v1/embeddables/address.embedded';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @ManyToOne(() => Auth)
  auth: Auth;

  @ManyToOne(() => Role)
  role: Role;

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
}
