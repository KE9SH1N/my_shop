import { Module } from '@nestjs/common';
import { RolesRepository } from 'src/roles/v1/repository/roles.repository';
import { JwtStrategy } from './util/jwt.strategy';
import { AuthV1Module } from './v1/auth.module';
import { AuthRepository } from './v1/repository/auth.repository';

@Module({
  imports: [AuthV1Module],
  providers: [JwtStrategy, AuthRepository, RolesRepository],
})
export class AuthMainModule {}
