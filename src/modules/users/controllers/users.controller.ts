import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersUsecase } from '../domain/usecases/users.usecase';

@Controller('user')
export class UsersController {
  constructor(private readonly _usersUseCase: UsersUsecase) {}

  @Get('profile')
  getProfile() {
    return {
      message: 'Hello World',
    };
  }
}
