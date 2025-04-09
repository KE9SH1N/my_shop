import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UsersRepository } from './repository/users.repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, UsersRepository, UsersV1Module])],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
})
export class UsersV1Module {}
