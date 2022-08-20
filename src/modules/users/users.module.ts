import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersUsecase } from './domain/usecases/users.usecase';
import { UserEntity } from './data/entities/user.entity';
import { UsersRepositoryImpl } from './data/repositories/users.repository.impl';
import { UsersService } from './domain/services/users.service';
import { USERS_REPOSITORY } from './users.constants';
import { UserSettingsEntity } from './data/entities/user-setting.entity';

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
