import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/features/users/domain/services/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly _userService: UsersService,
    private readonly _jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this._userService.findByEmail(email);
    if (user && bcrypt.compareSync(password, user.password)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async signInWithEmailPassword(email: string, password: string) {
    const payload = { email: email, sub: password };
    return {
      access_token: this._jwtService.sign(payload),
    };
  }

  async signUpWithEmailPassword(email: string, pw: string) {
    const passwordEncrypted = await bcrypt.hash(pw, 10);
    const user = await this._userService.create({
      email: email,
      password: passwordEncrypted,
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return result;
  }

  decodeToken(token: string): any {
    return this._jwtService.decode(token);
  }
}
