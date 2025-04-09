import { HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Auth } from 'src/auth/entities/auth.entity';
import { CreateAuthDto } from 'src/auth/v1/dto/create-auth.dto';
import { LoginAuthDto } from 'src/auth/v1/dto/login-auth.dto';
import { CustomException } from 'src/common/exceptions/custom-exception';
import { RolesRepository } from 'src/roles/v1/repository/roles.repository';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class AuthRepository extends Repository<Auth> {
  constructor(
    private readonly dataSource: DataSource,
    private rolesRepository: RolesRepository,
  ) {
    super(Auth, dataSource.createEntityManager());
  }

  async createAccount(createAuthDto: CreateAuthDto): Promise<Auth> {
    const { user_id, password, role_name } = createAuthDto;

    const role = await this.rolesRepository.findOne({
      where: { role_name: role_name },
    });

    if (!role) {
      throw new CustomException('Role not found!', HttpStatus.NOT_FOUND);
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = this.create({
      user_id,
      password: hashedPassword,
      role,
    });

    await this.save(user);
    return this.save(user);
  }

  async findUserName(loginAuthDto: LoginAuthDto): Promise<Auth | null> {
    const { user_id } = loginAuthDto;
    return this.findOne({ where: { user_id }, relations: ['role'] });
  }
}
