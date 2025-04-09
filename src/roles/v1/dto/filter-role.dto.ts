import { IsOptional, IsString } from 'class-validator';

export class FilterRoleDto {
  @IsString()
  @IsOptional()
  role_id: string;
  @IsString()
  @IsOptional()
  role_name: string;
}
