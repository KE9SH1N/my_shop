import { Injectable } from '@nestjs/common';
import { PaginationDto } from 'src/common/shared/dto/pagination.dto';
import { DataSource, Repository } from 'typeorm';
import { CreateAnimalDto } from '../dto/create-animal.dto';
import { Animal } from '../entities/animal.entity';

@Injectable()
export class AnimalRepository extends Repository<Animal> {
  // You can add custom methods to the repository here

  constructor(private readonly dataSourse: DataSource) {
    super(Animal, dataSourse.createEntityManager());
  }
  async findAllAnimals(
    paginationDto: PaginationDto,
    name?: string,
  ): Promise<{ data: Animal[]; total: number; page: number; limit: number }> {
    const query = this.createQueryBuilder('animal');

    const { page = 1, limit = 10 } = paginationDto;

    if (name) {
      query.andWhere('animal.name ILIKE :name', { name: `%${name}%` });
    }

    let data: Animal[];
    let total: number;

    if (page && limit) {
      [data, total] = await query
        .skip((page - 1) * limit)
        .take(limit)
        .getManyAndCount();
    } else {
      data = await query.getMany();
      total = data.length;
    }

    // const allAnimal = await query.getMany();

    return { data, total, page, limit };
  }

  async createAnimal(createAnimalDto: CreateAnimalDto): Promise<Animal> {
    const { name, species, age } = createAnimalDto;
    const animal = this.create({
      name,
      species,
      age,
    }); // Create a new animal
    return this.save(animal); // Save the animal in the database
  }
}
