import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  Version,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/util/jwt-auth.guard';
import { Roles } from 'src/roles/decorators/roles.decorator';
import { RolesGuard } from 'src/roles/guards/roles.guard';
import { User } from '../entities/user.entity';
import { CreateOwnProfileDto } from './dto/create-own-profile.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/new')
  @Version('1')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<{ statusCode: number; message: string; data: User }> {
    return this.usersService.createUserProfile(createUserDto);
  }

  //logged in user profile create
  @Post('/profile')
  @Version('1')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('agent')
  createOwnProfile(
    @Body() createOwnProfileDto: CreateOwnProfileDto,
    @Req() req,
  ): Promise<{ statusCode: number; message: string; data: User }> {
    const authId = req.user?.id;
    return this.usersService.createOwnProfile(authId, createOwnProfileDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
