import { IsOptional, IsString, Matches } from 'class-validator';
import { AddressDto } from './address.dto';

export class CreateOwnProfileDto {
  @IsString()
  user_id: string; // You can auto-generate or accept this if needed

  @IsString()
  @Matches(/^[A-Za-z]+$/, {
    message:
      'First name can only contain English alphabets (A-Z, a-z) with no spaces.',
  })
  first_name: string;

  @IsString()
  @Matches(/^[A-Za-z]+$/, {
    message:
      'Last name can only contain English alphabets (A-Z, a-z) with no spaces.',
  })
  last_name: string;

  @IsOptional()
  @IsString()
  profile_image: string;

  @IsOptional()
  @IsString()
  cover_image: string;

  @IsOptional()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  primary_phone_number: string;

  @IsOptional()
  @IsString()
  secondary_phone_number: string;

  @IsOptional()
  present_address: AddressDto;

  @IsOptional()
  permanent_address: AddressDto;

  @IsOptional()
  @IsString()
  blood_group: string;

  @IsOptional()
  @IsString()
  nid: string;
}
