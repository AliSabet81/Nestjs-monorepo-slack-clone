import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ParseCookieInterceptor implements NestInterceptor {
  constructor(private readonly jwtService: JwtService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context
      .switchToHttp()
      .getRequest<Request & { user: string }>();
    const token = request.cookies['accessToken'];
    const { email } = this.jwtService.verify(token);
    request['user'] = email;

    return next.handle();
  }
}
