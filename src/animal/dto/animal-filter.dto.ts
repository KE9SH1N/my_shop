// src/animal/dto/animal-filter.dto.ts
import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/common/shared/dto/pagination.dto';

export class AnimalFilterDto extends PaginationDto {
  @IsOptional()
  @IsString()
  name?: string;
}
