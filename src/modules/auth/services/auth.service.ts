import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash } from 'bcrypt';

import { validateHash } from '../../app/common/utils';
import { AppConfigService } from '../../config/config.service';
import type { UserEntity } from '../../users/data/entities/user.entity';
import { UsersService } from '../../users/domain/services/users.service';
import type { RoleType } from '../constants';
import { TokenType } from '../constants';
import type { AuthSignUpEmailPasswordModel } from '../dto';
import { TokenPayloadDto } from '../dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: AppConfigService,
  ) {}

  async signInWithEmailPassword(
    email: string,
    password: string,
  ): Promise<UserEntity> {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Your email or password is incorrect');
    }

    const isPasswordValid = await validateHash(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Your email or password is incorrect');
    }

    return user;
  }

  async signUpWithEmailPassword(
    data: AuthSignUpEmailPasswordModel,
  ): Promise<UserEntity> {
    const passwordEncrypted = await hash(data.password, 10);
    const user = await this.userService.create({
      email: data.email,
      password: passwordEncrypted,
    });

    return user;
  }

  async createAccessToken(data: {
    role: RoleType;
    userId: Uuid;
  }): Promise<TokenPayloadDto> {
    return new TokenPayloadDto({
      expiresIn: this.configService.authConfig.jwtExpirationTime,
      accessToken: await this.jwtService.signAsync({
        userId: data.userId,
        type: TokenType.ACCESS_TOKEN,
        role: data.role,
      }),
    });
  }
}
