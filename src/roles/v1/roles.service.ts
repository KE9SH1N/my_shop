import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomException } from 'src/common/exceptions/custom-exception';
import { PaginationDto } from 'src/common/shared/dto/pagination.dto';
import { Role } from '../entities/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { FilterRoleDto } from './dto/filter-role.dto';
import { RolesRepository } from './repository/roles.repository';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(RolesRepository)
    private readonly rolesRepository: RolesRepository,
  ) {}
  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const existingRole = await this.rolesRepository.findOne({
      where: { role_name: createRoleDto.role_name },
    });

    if (existingRole) {
      throw new CustomException('Role already exists', HttpStatus.CONFLICT);
    }
    return this.rolesRepository.createRole(createRoleDto);
  }

  async findAll(
    filterRoleDto: FilterRoleDto,
    paginationDto: PaginationDto,
  ): Promise<{
    statusCode: number;
    message: string;
    data: Role[];
    pagination: {
      total_data: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  }> {
    return this.rolesRepository.findRoleByName(filterRoleDto, paginationDto);
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} role`;
  // }

  // update(id: number, updateRoleDto: UpdateRoleDto) {
  //   return `This action updates a #${id} role`;
  // }

  async remove(filterRoleDto: FilterRoleDto): Promise<{ message: string }> {
    return this.rolesRepository.removeRoleById(filterRoleDto);
  }
}
