import {
  Controller,
  Post,
  Body,
  Version,
  HttpCode,
  HttpStatus,
  Get,
} from '@nestjs/common';
import { AuthService } from './services/auth.service';
import {
  AuthSignInEmailPasswordModel,
  AuthSignUpEmailPasswordModel,
  LoginPayloadDto,
} from './dto';
import { ApiTags } from '@nestjs/swagger';
import { RoleType } from './constants';
import { Auth } from './decorators/auth.decorator';
import { AuthUser } from './decorators';
import { UserEntity } from '../users/data/entities/user.entity';
import { UserDto } from '../users/dto/user.dto';


@Controller({
  path: 'auth',
})
@ApiTags('auth')
export class AuthController {
  private readonly _authService: AuthService;

  constructor(authService: AuthService) {
    this._authService = authService;
  }

  @Version('1')
  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  async login(@Body() userLoginModel: AuthSignInEmailPasswordModel) : Promise<LoginPayloadDto>{
    const userEntity = await this._authService.signInWithEmailPassword(
      userLoginModel.email,
      userLoginModel.password,
    );

    const token = await this._authService.createAccessToken({
      userId: userEntity.id,
      role: userEntity.role,
    });

    return new LoginPayloadDto(userEntity.toDto(), token);
  }

  @Version('1')
  @Post('sign-up')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() userLoginModel: AuthSignUpEmailPasswordModel) {
    return this._authService.signUpWithEmailPassword(userLoginModel);
  }

  @Version('1')
  @Get('me')
  @HttpCode(HttpStatus.OK)
  @Auth([RoleType.USER, RoleType.ADMIN])
  getCurrentUser(@AuthUser() user: UserEntity): UserDto {
    return user.toDto();
  }
}
