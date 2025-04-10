import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnimalController } from './animal.controller';
import { AnimalService } from './animal.service';
import { Animal } from './entities/animal.entity';
import { AnimalRepository } from './repository/animals.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Animal, AnimalRepository])],
  controllers: [AnimalController],
  providers: [AnimalService, AnimalRepository],
})
export class AnimalModule {}
