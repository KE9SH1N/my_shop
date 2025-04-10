import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CreateAnimalDto } from '../dto/create-animal.dto';
import { Animal } from '../entities/animal.entity';

@Injectable()
export class AnimalRepository extends Repository<Animal> {
  // You can add custom methods to the repository here

  constructor(private readonly dataSourse: DataSource) {
    super(Animal, dataSourse.createEntityManager());
  }
  async findAllAnimals(name?: string): Promise<Animal[]> {
    const query = this.createQueryBuilder('animal');

    if (name) {
      query.andWhere('animal.name ILIKE :name', { name: `%${name}%` });
    }

    const animals = await query.getMany();
    return animals;
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
