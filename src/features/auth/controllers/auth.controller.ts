import { Controller, Post, UseGuards, Body, Version } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { UserSignInDto, UserSignUpDto } from '../dto';
import { LocalAuthGuard } from '../guards/local-auth.guard';

@Controller({
  path: 'auth',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Version('1')
  @Post('sign-in')
  async login(@Body() userLoginDto: UserSignInDto) {
    return this.authService.signInWithEmailPassword(
      userLoginDto.email,
      userLoginDto.password,
    );
  }

  @Version('1')
  @Post('sign-up')
  async register(@Body() userLoginDto: UserSignUpDto) {
    return this.authService.signUpWithEmailPassword(
      userLoginDto.email,
      userLoginDto.password,
    );
  }
}
