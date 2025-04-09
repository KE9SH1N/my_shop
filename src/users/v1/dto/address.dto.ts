import { IsString } from 'class-validator';

export class AddressDto {
  //   @IsNotEmpty({ message: 'Division can not be empty.' })
  @IsString()
  division: string;

  //   @IsNotEmpty({ message: 'District can not be empty.' })
  @IsString()
  district: string;

  //   @IsNotEmpty({ message: 'Thana can not be empty.' })
  @IsString()
  thana: string;

  //   @IsNotEmpty({ message: 'Local Address can not be empty.' })
  @IsString()
  local_area: string;
}
