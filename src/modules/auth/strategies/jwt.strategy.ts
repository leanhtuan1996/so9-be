import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AppConfigService } from '../../config/config.service';
import { UserEntity } from '../../users/data/entities/user.entity';
import { UsersService } from '../../users/domain/services/users.service';
import { RoleType, TokenType } from '../constants';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: AppConfigService,
    private userService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.authConfig.publicKey,
    });
  }

  async validate(args: {
    userId: Uuid;
    role: RoleType;
    type: TokenType;
  }): Promise<UserEntity> {
    if (args.type !== TokenType.ACCESS_TOKEN) {
      throw new UnauthorizedException('Your access token is invalid or expired');
    }

    const user = await this.userService.findOne({
      // FIXME: issue with type casts
      id: args.userId as never,
      role: args.role,
    });

    if (!user) {
      throw new UnauthorizedException('Your access token is invalid or expired');
    }

    return user;
  }
}
