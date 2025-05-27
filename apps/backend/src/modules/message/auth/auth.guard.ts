import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';
import * as cookie from 'cookie';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const client: Socket = context.switchToWs().getClient<Socket>();
    const cookies = client.handshake.headers.cookie;
    if (!cookies) {
      console.log(`event failed auth: no cookies`);
      client.emit('auth_error', 'No cookies provided');
      client.disconnect();
      return false;
    }

    const parsedCookies = cookie.parse(cookies);
    const accessToken = parsedCookies['accessToken'];

    if (!accessToken) {
      console.log(`event failed auth: no access token!`);
      client.emit('auth_error', 'No access token provided');
      client.disconnect();
      return false;
    }
    try {
      await this.jwtService.verifyAsync(accessToken);
      console.log(`event passed auth!`);
      return true;
    } catch (error) {
      console.log(`event failed auth: invalid access token`);
      client.emit('auth_error', 'Invalid access token');
      client.disconnect();
      return false;
    }
  }
}
