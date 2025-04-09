import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomException } from 'src/common/exceptions/custom-exception';
import { User } from '../entities/user.entity';
import { CreateOwnProfileDto } from './dto/create-own-profile.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './repository/users.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly usersRepository: UsersRepository,
  ) {}
  async createUserProfile(
    createUserDto: CreateUserDto,
  ): Promise<{ statusCode: number; message: string; data: User }> {
    const existingUser = await this.usersRepository.findOne({
      where: { user_id: createUserDto.user_id },
    });

    if (existingUser) {
      throw new CustomException('User already exists', HttpStatus.CONFLICT);
    }

    const savedNewUser = await this.usersRepository.createUser(createUserDto);

    return {
      statusCode: 200,
      message: 'User information inserted successfully',
      data: savedNewUser,
    };
  }

  async createOwnProfile(
    authId: string,
    createOwnProfileDto: CreateOwnProfileDto,
  ): Promise<{ statusCode: number; message: string; data: User }> {
    if (!authId) {
      throw new Error('Missing authenticated user id');
    }

    const user = this.usersRepository.create({
      ...createOwnProfileDto,
      auth: { id: authId },
      role: { role_name: 'agent' }, // or fetch from DB if needed
    });

    const saved = await this.usersRepository.save(user);

    return {
      statusCode: 200,
      message: 'Profile created successfully',
      data: saved,
    };
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
