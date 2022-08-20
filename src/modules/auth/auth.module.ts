import { Module } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersService } from '../users/domain/services/users.service';
import { AppConfigModule } from '../config/config.module';
import { AppConfigService } from '../config/config.service';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [AppConfigModule],
      useFactory: (configService: AppConfigService) => ({
        privateKey: configService.authConfig.privateKey,
        publicKey: configService.authConfig.publicKey,
        signOptions: {
          algorithm: 'RS256',
              expiresIn: configService.authConfig.jwtExpirationTime
        },
        verifyOptions: {
          algorithms: ['RS256'],
        },
      }),
      inject: [AppConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [UsersService, AuthService, JwtStrategy],
  exports: [JwtModule, AuthService],
})
export class AuthModule {}
