import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from './controllers/users.controller';
import { UserEntity } from './data/entities/user.entity';
import { UserSettingsEntity } from './data/entities/user-setting.entity';
import { UsersRepositoryImpl } from './data/repositories/users.repository.impl';
import { UsersService } from './domain/services/users.service';
import { UsersUsecase } from './domain/usecases/users.usecase';
import { USERS_REPOSITORY } from './users.constants';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, UserSettingsEntity])],
  providers: [
    UsersService,
    UsersUsecase,
    {
      provide: USERS_REPOSITORY,
      useClass: UsersRepositoryImpl,
    },
  ],
  controllers: [UsersController],
  exports: [
    TypeOrmModule,
    UsersService,
    {
      provide: USERS_REPOSITORY,
      useClass: UsersRepositoryImpl,
    },
  ],
})
export class UsersModule {}
