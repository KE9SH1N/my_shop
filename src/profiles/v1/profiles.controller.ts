import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Version,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
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
    // Convert camelCase to snake_case before passing to service
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
  @UseInterceptors(FileInterceptor('profile_image'))
  async update(
    @Param('id') id: string,
    @Body() updateProfileDto: UpdateProfileDto,
    @UploadedFile() profileImage: Express.Multer.File,
  ): Promise<{ statusCode: number; message: string; data: Profile }> {
    if (profileImage) {
      updateProfileDto.profile_image = profileImage.filename;
    }

    const updatedProfileDetails = await this.profilesService.updateProfileById(
      id,
      updateProfileDto,
    );

    updatedProfileDetails.profile_image = `http://localhost:3001/uploads/${profileImage.filename}`;

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
