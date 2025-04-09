import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Auth } from '../entities/auth.entity';
import { AuthRepository } from '../v1/repository/auth.repository';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(AuthRepository)
    private authRepository: AuthRepository,
  ) {
    super({
      secretOrKey: 'topSecret51',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }
  async validate(payload: JwtPayload): Promise<Auth> {
    const { user_id } = payload;
    const user = await this.authRepository.findOne({
      where: { user_id },
      relations: ['role'],
    });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    // console.log('Authenticated User:', user);
    return user;
  }
}
