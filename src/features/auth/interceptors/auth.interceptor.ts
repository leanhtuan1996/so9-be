import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  constructor(private readonly authService: AuthService) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();

    const tokenArray = req.headers.authorization;

    if (tokenArray) {
      req.body['user'] = this.authService.decodeToken(tokenArray.split(' ')[1]);
    }
    console.log(req.body);
    return next.handle().pipe();
  }
}
