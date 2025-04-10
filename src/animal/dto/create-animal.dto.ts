import { IsInt, IsString, Min } from 'class-validator';

export class CreateAnimalDto {
  @IsString()
  name: string;

  @IsString()
  species: string;

  @IsInt()
  @Min(0)
  age: number;
}
