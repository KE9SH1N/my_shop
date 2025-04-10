import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
  Version,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/util/jwt-auth.guard';
import { PaginationDto } from 'src/common/shared/dto/pagination.dto';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../entities/role.entity';
import { RolesGuard } from '../guards/roles.guard';
import { CreateRoleDto } from './dto/create-role.dto';
import { FilterRoleDto } from './dto/filter-role.dto';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post('/new')
  @Version('1')
  async create(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
    return await this.rolesService.create(createRoleDto);
  }

  @Get()
  @Version('1')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async findAll(
    @Query() filterRoleDto: FilterRoleDto,
    @Query() paginationDto: PaginationDto,
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
    return this.rolesService.findAll(filterRoleDto, paginationDto);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.rolesService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
  //   return this.rolesService.update(+id, updateRoleDto);
  // }

  @Delete(':id')
  @Version('1')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async remove(
    @Param('id') role_id: string,
    @Body() filterRoleDto: FilterRoleDto,
  ): Promise<{
    message: string;
  }> {
    return this.rolesService.remove({
      role_id,
      role_name: filterRoleDto.role_name,
    });
  }
}
