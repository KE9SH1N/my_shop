import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from 'src/auth/entities/auth.entity';
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

  async findAllProfile(first_name?: string): Promise<Profile[]> {
    return this.profilesRepository.findAllProfile(first_name);
  }

  async findProfileById(id: string): Promise<Profile> {
    return this.profilesRepository.findProfileById(id);
  }

  async updateProfileById(
    id: string,
    updateProfileDto: UpdateProfileDto,
  ): Promise<Profile> {
    const updatedProfile = await this.profilesRepository.save({
      ...updateProfileDto,
      id, // Ensure the ID is passed to update the correct record
    });

    return updatedProfile;
  }

  remove(id: number) {
    return `This action removes a #${id} profile`;
  }
}
