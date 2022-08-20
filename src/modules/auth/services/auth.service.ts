import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';
import { validateHash } from '../../app/common/utils';
import { AppConfigService } from '../../config/config.service';
import { UserEntity } from '../../users/data/entities/user.entity';
import { UsersService } from '../../users/domain/services/users.service';
import { RoleType, TokenType } from '../constants';
import { AuthSignUpEmailPasswordModel, TokenPayloadDto } from '../dto';

@Injectable()
export class AuthService {
  private readonly _userService: UsersService;
  private readonly _jwtService: JwtService;
  private readonly _configService: AppConfigService;

  constructor(userService: UsersService, jwtService: JwtService, configService: AppConfigService) {
    this._userService = userService;
    this._jwtService = jwtService;
    this._configService = configService;
  }

  async signInWithEmailPassword(email: string, password: string): Promise<UserEntity> {
    const user = await this._userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Your email or password is incorrect');
    }
    
    const isPasswordValid = await validateHash(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Your email or password is incorrect');
    }
    return user!;
  }

  async signUpWithEmailPassword(
    data: AuthSignUpEmailPasswordModel,
  ): Promise<UserEntity> {
    const passwordEncrypted = await bcrypt.hash(data.password, 10);
    const user = await this._userService.create({
      email: data.email,
      password: passwordEncrypted,
    });
    return user;
  }

  decodeToken(token: string): any {
    return this._jwtService.decode(token);
  }

  async createAccessToken(data: {
    role: RoleType;
    userId: Uuid;
  }): Promise<TokenPayloadDto> {
    return new TokenPayloadDto({
      expiresIn: this._configService.authConfig.jwtExpirationTime,
      accessToken: await this._jwtService.signAsync({
        userId: data.userId,
        type: TokenType.ACCESS_TOKEN,
        role: data.role,
      }),
    });
  }
}
