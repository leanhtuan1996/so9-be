import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Version,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { UserEntity } from '../users/data/entities/user.entity';
import { UserDto } from '../users/dto/user.dto';
import { RoleType } from './constants';
import { AuthUser } from './decorators';
import { Auth } from './decorators/auth.decorator';
import {
  AuthSignInEmailPasswordModel,
  AuthSignUpEmailPasswordModel,
  LoginPayloadDto,
} from './dto';
import { AuthService } from './services/auth.service';

@Controller({
  path: 'auth',
})
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Version('1')
  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  @ApiOkResponse({
    type: LoginPayloadDto,
    description: 'User info with access token',
  })
  async login(
    @Body() userLoginModel: AuthSignInEmailPasswordModel,
  ): Promise<LoginPayloadDto> {
    const userEntity = await this.authService.signInWithEmailPassword(
      userLoginModel.email,
      userLoginModel.password,
    );

    const token = await this.authService.createAccessToken({
      userId: userEntity.id,
      role: userEntity.role,
    });

    return new LoginPayloadDto(userEntity.toDto(), token);
  }

  @Version('1')
  @Post('sign-up')
  @HttpCode(HttpStatus.CREATED)
  @ApiOkResponse({ type: UserDto, description: 'Successfully Registered' })
  async register(
    @Body() userLoginModel: AuthSignUpEmailPasswordModel,
  ): Promise<UserDto> {
    const createdUser = await this.authService.signUpWithEmailPassword(
      userLoginModel,
    );

    return createdUser.toDto({
      isActive: true,
    });
  }

  @Version('1')
  @Get('me')
  @HttpCode(HttpStatus.OK)
  @Auth([RoleType.USER, RoleType.ADMIN])
  @ApiOkResponse({ type: UserDto, description: 'current user info' })
  getCurrentUser(@AuthUser() user: UserEntity): UserDto {
    return user.toDto();
  }
}
