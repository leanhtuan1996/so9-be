export class UserSignInDto {
  constructor(data: Partial<UserSignInDto>) {
    Object.assign(this, data);
  }

  email: string;
  password: string;
}
