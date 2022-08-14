export class UserSignUpDto {
  constructor(data: Partial<UserSignUpDto>) {
    Object.assign(this, data);
  }

  email: string;
  password: string;
}
