import { Injectable } from '@nestjs/common';
import { Profile } from 'src/profiles/entities/profile.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateProfileDto } from '../dto/create-profile.dto';
import { UpdateProfileDto } from '../dto/update-profile.dto';

@Injectable()
export class ProfilesRepository extends Repository<Profile> {
  constructor(private readonly dataSource: DataSource) {
    super(Profile, dataSource.createEntityManager());
  }

  //create profile
  async createProfile(createProfileDto: CreateProfileDto): Promise<Profile> {
    const profile = this.create(createProfileDto);
    return this.save(profile);
  }

  //find profile by id
  async findProfileById(id: string): Promise<Profile> {
    const profileData = await this.findOne({
      where: { id },
      relations: [],
    });
    return profileData;
  }

  //find all profile
  // async findAllProfile(paginationDto: PaginationDto) {
  //   const { page = 1, limit = 10 } = paginationDto;
  //   const query = this.createQueryBuilder('profile');

  //   const [data, total] = await query
  //     .skip((page - 1) * limit)
  //     .take(limit)
  //     .orderBy('profile.created_at', 'DESC')
  //     .getManyAndCount();

  //   const successMesg = 'All Profiles retrieved successfully';

  //   return paginateResponse(data, total, page, limit, successMesg);
  // }

  async findAllProfile(first_name?: string): Promise<Profile[]> {
    const query = this.createQueryBuilder('profile');

    if (first_name) {
      query.andWhere('profile.first_name ILIKE :first_name', {
        first_name: `%${first_name}%`,
      });
    }

    const allProfile = await query.getMany();
    return allProfile;
  }

  async updateProfileById(
    id: string,
    updateProfileDto: UpdateProfileDto,
  ): Promise<Profile> {
    // Find the existing profile by id
    const profileToUpdate = await this.findOne({ where: { id } });

    if (!profileToUpdate) {
      throw new Error(`Profile with ID ${id} not found`);
    }

    const updatedProfile = this.merge(profileToUpdate, updateProfileDto);

    // Save the updated profile
    return this.save(updatedProfile);
  }
}
