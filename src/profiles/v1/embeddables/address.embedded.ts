import { Column } from 'typeorm';

export class Address {
  @Column({ nullable: true })
  division: string;

  @Column({ nullable: true })
  district: string;

  @Column({ nullable: true })
  thana: string;

  @Column({ nullable: true })
  local_area: string;
}
