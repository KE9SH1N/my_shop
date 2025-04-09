import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthV1Module } from 'src/auth/v1/auth.module';
import { Role } from '../entities/role.entity';
import { RolesRepository } from './repository/roles.repository';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';

@Module({
  imports: [TypeOrmModule.forFeature([Role, RolesRepository, AuthV1Module])],
  controllers: [RolesController],
  providers: [RolesService, RolesRepository],
})
export class RolesV1Module {}
