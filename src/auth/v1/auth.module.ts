import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfilesV1Module } from 'src/profiles/v1/profiles.module';
import { RolesRepository } from 'src/roles/v1/repository/roles.repository';
import { Auth } from '../entities/auth.entity';
import { JwtStrategy } from '../util/jwt.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthRepository } from './repository/auth.repository';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'topSecret51',
      signOptions: {
        expiresIn: 3600,
      },
    }),
    TypeOrmModule.forFeature([Auth, AuthRepository]),
    ProfilesV1Module,
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, RolesRepository, JwtStrategy],
  exports: [AuthService],
})
export class AuthV1Module {}
