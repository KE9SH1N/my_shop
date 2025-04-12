import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginatedResponse } from 'src/common/shared/utils/pagination-response';
import { AnimalFilterDto } from './dto/animal-filter.dto';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { Animal } from './entities/animal.entity';
import { AnimalRepository } from './repository/animals.repository';

@Injectable()
export class AnimalService {
  constructor(
    @InjectRepository(AnimalRepository)
    private readonly animalRepository: AnimalRepository,
  ) {}
  async create(createAnimalDto: CreateAnimalDto): Promise<Animal> {
    try {
      return await this.animalRepository.createAnimal(createAnimalDto); // Call repository to save
    } catch (error) {
      // Handle the error (log it, or throw a custom exception)
      throw new Error('Failed to create animal: ' + error.message);
    }
  }

  async findAll(
    animalFilterDto: AnimalFilterDto,
  ): Promise<PaginatedResponse<Animal>> {
    const { page, limit, name } = animalFilterDto;

    const { data, total } = await this.animalRepository.findAllAnimals(
      { page, limit },
      name,
    );

    return new PaginatedResponse<Animal>(data, total, page, limit);
  }

  // async findAll(
  //   animalFilterDto: AnimalFilterDto,
  // ): Promise<PaginatedResponse<Animal>> {
  //   const { data, total, page, limit } =
  //     await this.animalRepository.findAllAnimals(animalFilterDto);

  //   return new PaginatedResponse<Animal>(data, total, page, limit);
  // }

  findOne(id: number) {
    return `This action returns a #${id} animal`;
  }

  update(id: number, updateAnimalDto: UpdateAnimalDto) {
    return `This action updates a #${id} animal`;
  }

  remove(id: number) {
    return `This action removes a #${id} animal`;
  }
}
