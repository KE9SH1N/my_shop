import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  Version,
} from '@nestjs/common';
import { Auth } from 'src/auth/entities/auth.entity';
import { JwtAuthGuard } from 'src/auth/util/jwt-auth.guard';
import { PaginationDto } from 'src/common/shared/dto/pagination.dto';
import { Profile } from '../entities/profile.entity';
import { GetUser } from '../guards/get-user.decorator';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfilesService } from './profiles.service';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createProfileDto: CreateProfileDto, @GetUser() user: Auth) {
    return this.profilesService.createProfile(user, createProfileDto);
  }

  @Get('/all')
  @UseGuards(JwtAuthGuard)
  @Version('1')
  async findAllProfile(@Query() paginationDto: PaginationDto): Promise<{
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
    return this.profilesService.findAllProfile(paginationDto);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @Version('1')
  async findProfileById(
    @Param('id') id: string,
  ): Promise<{ statusCode: number; message: string; data: Profile }> {
    const profileDetailsById = await this.profilesService.findProfileById(id);

    return {
      statusCode: 200,
      message: 'Profile details by Id retrieved successfully',
      data: profileDetailsById,
    };
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @Version('1')
  async update(
    @Param('id') id: string,
    @Body() updateProfileDto: UpdateProfileDto,
  ): Promise<{ statusCode: number; message: string; data: Profile }> {
    const updatedProfileDetails = await this.profilesService.updateProfileById(
      id,
      updateProfileDto,
    );
    return {
      statusCode: 200,
      message: 'Profile updated successfully',
      data: updatedProfileDetails,
    };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profilesService.remove(+id);
  }
}
