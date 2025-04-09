import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { AddressDto } from 'src/users/v1/dto/address.dto';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class CreateProfileDto {
  @IsNotEmpty()
  user_id: string;

  @IsString()
  @Matches(/^[A-Za-z]+$/, {
    message:
      'First name can only contain English alphabets (A-Z, a-z) with no spaces.',
  })
  first_name: string;

  @IsString()
  @Matches(/^[A-Za-z]+$/, {
    message:
      'First name can only contain English alphabets (A-Z, a-z) with no spaces.',
  })
  last_name: string;

  @IsOptional()
  @IsString()
  profile_image?: string;

  @IsOptional()
  @IsString()
  cover_image?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsDateString()
  date_of_birth?: string;

  @IsOptional()
  @IsString()
  primary_phone_number?: string;

  @IsOptional()
  @IsString()
  secondary_phone_number?: string;

  @IsOptional()
  @IsString()
  present_address?: AddressDto;

  @IsOptional()
  @IsString()
  permanent_address?: AddressDto;

  @IsOptional()
  @IsString()
  blood_group?: string;

  @IsOptional()
  @IsString()
  nid?: string;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;
}
