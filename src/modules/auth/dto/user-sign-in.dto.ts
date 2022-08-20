import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthSignInEmailPasswordModel {
  constructor(data: Partial<AuthSignInEmailPasswordModel>) {
    Object.assign(this, data);
  }

  @IsEmail()
  @ApiProperty()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly password: string;
}
