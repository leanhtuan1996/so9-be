import { IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class CreateUserModel {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
