import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UsersUsecase } from '../domain/usecases/users.usecase';

@Controller('user')
@ApiTags('user')
export class UsersController {
  constructor(private readonly usersUseCase: UsersUsecase) {}
}
