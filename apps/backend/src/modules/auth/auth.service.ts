import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OAuth2Client as GoogleOAuth } from 'google-auth-library';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  private oauthClient: GoogleOAuth;
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    const clientId = this.configService.getOrThrow(`google.clientId`);
    const clientSecret = this.configService.getOrThrow(`google.clientSecret`);
    console.log(`clientId`, clientId);
    console.log(`clientSecret`, clientSecret);
    this.oauthClient = new GoogleOAuth(clientId, clientSecret);
  }

  async googleAuth(idToken: string) {
    try {
      const loginTicket = await this.oauthClient.verifyIdToken({ idToken });
      console.log(`loginTicket`, loginTicket);
      const payload = loginTicket.getPayload();
      if (
        !payload ||
        !payload.email ||
        !payload.given_name ||
        !payload.family_name
      ) {
        console.log(payload);
        throw new UnauthorizedException();
      }
      const user = await this.userService.findOne({ email: payload.email });
      if (user) return user;
      return await this.userService.create({
        email: payload.email,
        name: payload.given_name + ' ' + payload.family_name,
      });
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException();
    }
  }
}
