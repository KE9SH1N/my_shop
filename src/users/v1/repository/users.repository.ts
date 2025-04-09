import { Injectable, NotFoundException } from '@nestjs/common';
import { Auth } from 'src/auth/entities/auth.entity';
import { Role } from 'src/roles/entities/role.entity';
import { User } from 'src/users/entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(private readonly dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { user_id, auth_id, role_id, ...rest } = createUserDto;

    // Fetch related entities
    const auth = await this.manager.findOne(Auth, { where: { id: auth_id } });
    if (!auth) throw new NotFoundException('Auth user not found');

    const role = await this.manager.findOne(Role, { where: { id: role_id } });
    if (!role) throw new NotFoundException('Role not found');

    const newUser = this.create({
      user_id,
      auth,
      role,
      ...rest,
    });
    const savedNewUser = await this.save(newUser);
    return savedNewUser;
  }
}
