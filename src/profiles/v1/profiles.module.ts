import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from 'src/common/shared/shared.module';
import { Profile } from '../entities/profile.entity';
import { ProfilesController } from './profiles.controller';
import { ProfilesService } from './profiles.service';
import { ProfilesRepository } from './repository/profiles.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Profile, ProfilesRepository]),
    SharedModule,
  ],

  controllers: [ProfilesController],
  providers: [ProfilesService, ProfilesRepository],
  exports: [ProfilesService],
})
export class ProfilesV1Module {}
