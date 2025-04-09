import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CustomException } from 'src/common/exceptions/custom-exception';
import { PaginationDto } from 'src/common/shared/dto/pagination.dto';
import { Role } from 'src/roles/entities/role.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateRoleDto } from '../dto/create-role.dto';
import { FilterRoleDto } from '../dto/filter-role.dto';

@Injectable()
export class RolesRepository extends Repository<Role> {
  constructor(private readonly dataSource: DataSource) {
    super(Role, dataSource.createEntityManager());
  }

  async createRole(createRoleDto: CreateRoleDto): Promise<Role> {
    const role = this.create(createRoleDto);
    // if(role )
    return this.save(role);
  }

  async findRoleByName(
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
    const { role_name } = filterRoleDto;
    const { page, limit } = paginationDto;
    const query = this.createQueryBuilder('role');
    if (role_name) {
      query.where('role.role_name = :role_name', { role_name });
    }
    const roles = await query.getMany();
    if (roles.length === 0) {
      throw new CustomException('Role not found!', HttpStatus.BAD_REQUEST);
    }

    // Get the total number of items before pagination
    const total_data = await query.getCount();

    query.skip((page - 1) * limit).take(limit);

    const data = await query.getMany();
    // Calculate the total pages
    const totalPages = Math.ceil(total_data / limit);

    return {
      statusCode: 200,
      message: 'Roles retrieved successfully',
      data,
      pagination: {
        total_data,
        page,
        limit,
        totalPages,
      },
    };
  }

  async removeRoleById(
    filterRoleDto: FilterRoleDto,
  ): Promise<{ message: string }> {
    const { role_id } = filterRoleDto;
    const role = await this.findOne({ where: { id: role_id } });

    if (!role) {
      throw new NotFoundException(`role id- ${role_id} not found`);
    }

    const role_name = role.role_name;

    const result = await this.delete(role_id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${role_name}" not found.`);
    }
    return { message: `Role with ID "${role_name}" successfully deleted.` };
  }
}
