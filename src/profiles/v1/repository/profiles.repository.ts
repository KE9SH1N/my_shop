import { Injectable } from '@nestjs/common';
import { PaginationDto } from 'src/common/shared/dto/pagination.dto';
import { paginateResponse } from 'src/common/shared/utils/pagination-response';
import { Profile } from 'src/profiles/entities/profile.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateProfileDto } from '../dto/create-profile.dto';
import { UpdateProfileDto } from '../dto/update-profile.dto';

@Injectable()
export class ProfilesRepository extends Repository<Profile> {
  constructor(private readonly dataSource: DataSource) {
    super(Profile, dataSource.createEntityManager());
  }

  async createProfile(createProfileDto: CreateProfileDto): Promise<Profile> {
    const profile = this.create(createProfileDto);
    return this.save(profile);
  }

  async findProfileById(id: string): Promise<Profile> {
    const profileData = await this.findOne({
      where: { id },
      relations: [],
    });
    return profileData;
  }

  async findAllProfile(paginationDto: PaginationDto) {
    const { page = 1, limit = 10 } = paginationDto;

    const [data, total] = await this.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { created_at: 'DESC' }, // optional
    });
    const successMesg = 'All Profiles retrieved successfully';

    return paginateResponse(data, total, page, limit, successMesg);
  }

  async updateProfileById(
    id: string,
    updateProfileDto: UpdateProfileDto,
  ): Promise<Profile> {
    await this.update({ id }, updateProfileDto);

    const updatedProfile = await this.findOneOrFail({ where: { id } });

    return updatedProfile;
  }
}
