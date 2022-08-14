import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile() {
    return {
      message: 'Hello World',
    };
  }
}
