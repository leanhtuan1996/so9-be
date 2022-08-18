import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { UsersUsecase } from '../domain/usecases/users.usecase';

@Controller('user')
export class UsersController {
  constructor(private readonly _usersUseCase: UsersUsecase) {}

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile() {
    return {
      message: 'Hello World',
    };
  }
}
