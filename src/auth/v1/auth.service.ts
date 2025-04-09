import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CustomException } from 'src/common/exceptions/custom-exception';
import { CreateProfileDto } from 'src/profiles/v1/dto/create-profile.dto';
import { ProfilesService } from 'src/profiles/v1/profiles.service';
import { JwtPayload } from '../util/jwt-payload.interface';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { AuthRepository } from './repository/auth.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly profilesService: ProfilesService,
    private jwtService: JwtService,
  ) {}

  async createUser(
    createAuthDto: CreateAuthDto,
  ): Promise<{ statusCode: number; message: string }> {
    const user = await this.authRepository.createAccount(createAuthDto);

    const createProfileDto: CreateProfileDto = {
      user_id: user.user_id,
      first_name: '',
      last_name: '',
    };
    await this.profilesService.createProfile(user, createProfileDto);
    return {
      statusCode: 200,
      message: 'User and Profile Created Successfully',
    };
  }

  async loginUser(
    loginAuthDto: LoginAuthDto,
  ): Promise<{ statusCode: number; message: string; accessToken: string }> {
    const { user_id, password } = loginAuthDto;
    const authorizedUser = await this.authRepository.findUserName(loginAuthDto);
    if (
      authorizedUser &&
      (await bcrypt.compare(password, authorizedUser.password))
    ) {
      const role_name = authorizedUser.role.role_name;
      const payload: JwtPayload = { user_id, role_name };
      const accessToken = await this.jwtService.sign(payload);
      return {
        statusCode: 200,
        message: 'User successfully logged in !',
        accessToken,
      };
    } else {
      throw new CustomException(
        'unauthorized access request',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  // findAll() {
  //   return `This action returns all auth`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} auth`;
  // }

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} auth`;
  // }
}
