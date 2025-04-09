import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from 'src/auth/entities/auth.entity';
import { PaginationDto } from 'src/common/shared/dto/pagination.dto';
import { Profile } from '../entities/profile.entity';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfilesRepository } from './repository/profiles.repository';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(ProfilesRepository)
    private profilesRepository: ProfilesRepository,
  ) {}

  async createProfile(
    user: Auth,
    createProfileDto: CreateProfileDto,
  ): Promise<Profile> {
    const profile = this.profilesRepository.create({
      ...createProfileDto,
      user,
    });
    return this.profilesRepository.save(profile);
  }

  async findAllProfile(paginationDto: PaginationDto): Promise<{
    statusCode: number;
    message: string;
    data: Profile[];
    pagination: {
      total_data: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  }> {
    return this.profilesRepository.findAllProfile(paginationDto);
  }

  async findProfileById(id: string): Promise<Profile> {
    return this.profilesRepository.findProfileById(id);
  }

  async updateProfileById(
    id: string,
    updateProfileDto: UpdateProfileDto,
  ): Promise<Profile> {
    const updatedProfile = await this.profilesRepository.updateProfileById(
      id,
      updateProfileDto,
    );
    return updatedProfile;
  }

  remove(id: number) {
    return `This action removes a #${id} profile`;
  }
}
