import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const accessToken = request.cookies[`accessToken`];
    if (!accessToken) {
      throw new UnauthorizedException();
    }
    try {
      await this.jwtService.verifyAsync(accessToken);
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException();
    }
    return true;
  }
}
