import { Injectable } from '@nestjs/common';

import { UsersService } from '../services/users.service';

@Injectable()
export class UsersUsecase {
  constructor(private readonly usersService: UsersService) {}
}
