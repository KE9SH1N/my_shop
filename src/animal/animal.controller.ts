import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Version,
} from '@nestjs/common';
import { PaginatedResponse } from 'src/common/shared/utils/pagination-response';
import { AnimalService } from './animal.service';
import { AnimalFilterDto } from './dto/animal-filter.dto';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { Animal } from './entities/animal.entity';

@Controller('animal')
export class AnimalController {
  constructor(private readonly animalService: AnimalService) {}

  @Post('/new')
  @Version('1')
  async create(
    @Body() createAnimalDto: CreateAnimalDto,
  ): Promise<{ statusCode: number; messages: string; data: Animal }> {
    const animalData = await this.animalService.create(createAnimalDto);
    return {
      statusCode: 200,
      messages: 'animal created successfully',
      data: animalData,
    };
  }

  @Get()
  @Version('1')
  async findAll(
    @Query() animalFilterDto: AnimalFilterDto,
    // @Query() paginationDto: PaginationDto,
    // @Query('name') name?: string,
  ): Promise<PaginatedResponse<Animal>> {
    const allAnimal = await this.animalService.findAll(animalFilterDto);
    return allAnimal;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.animalService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnimalDto: UpdateAnimalDto) {
    return this.animalService.update(+id, updateAnimalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.animalService.remove(+id);
  }
}
