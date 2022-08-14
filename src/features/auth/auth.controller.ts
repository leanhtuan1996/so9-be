import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserSignInDto, UserSignUpDto } from './dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  async login(@Body() userLoginDto: UserSignInDto) {
    return this.authService.signInWithEmailPassword(
      userLoginDto.email,
      userLoginDto.password,
    );
  }

  @Post('sign-up')
  async register(@Body() userLoginDto: UserSignUpDto) {
    return this.authService.signUpWithEmailPassword(
      userLoginDto.email,
      userLoginDto.password,
    );
  }
}
