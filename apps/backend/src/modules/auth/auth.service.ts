import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OAuth2Client as GoogleOAuth } from 'google-auth-library';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  private oauthClient: GoogleOAuth;
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {
    const clientId = this.configService.getOrThrow(`google.clientId`);
    const clientSecret = this.configService.getOrThrow(`google.clientSecret`);
    this.oauthClient = new GoogleOAuth(clientId, clientSecret);
  }

  async refreshTokens(refreshToken: string | undefined) {
    if (!refreshToken) {
      throw new UnauthorizedException();
    }
    try {
      const token = await this.jwtService.verifyAsync(refreshToken);
      const user = await this.userService.findOne({ email: token.email });
      if (!user) {
        throw new UnauthorizedException();
      }
      return await this.generateTokens(user);
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async generateTokens(user: User) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync({
        sub: user.id,
        email: user.email,
        name: user.name,
        expiresIn: 3600 * 15,
      }),
      this.jwtService.signAsync({
        sub: user.id,
        email: user.email,
        expiresIn: 3600 * 24 * 7,
      }),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }

  async googleAuth(idToken: string) {
    try {
      const loginTicket = await this.oauthClient.verifyIdToken({ idToken });
      const payload = loginTicket.getPayload();
      if (
        !payload ||
        !payload.email ||
        !payload.given_name ||
        !payload.family_name
      ) {
        throw new UnauthorizedException();
      }
      const user = await this.userService.findOne({ email: payload.email });
      if (user) return user;
      return await this.userService.create({
        email: payload.email,
        name: payload.given_name + ' ' + payload.family_name,
      });
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
