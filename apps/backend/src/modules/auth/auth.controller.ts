import { Body, Controller, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleTokenDto } from './dto/google-token.dto';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('logout')
  logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie(`accessToken`);
    response.clearCookie(`refreshToken`);
    return response
      .status(HttpStatus.OK)
      .json({ message: 'Logged out successfully' });
  }

  @Post('refresh')
  async refresh(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { accessToken, refreshToken } = await this.authService.refreshTokens(
      request.cookies[`refreshToken`],
    );
    response.cookie(`accessToken`, accessToken, {
      secure: process.env.NODE_ENV !== `development`,
      httpOnly: true,
      sameSite: process.env.NODE_ENV !== `development` ? `none` : `lax`,
      maxAge: 15 * 60 * 1000,
    });
    response.cookie(`refreshToken`, refreshToken, {
      secure: process.env.NODE_ENV !== `development`,
      httpOnly: true,
      sameSite: process.env.NODE_ENV !== `development` ? `none` : `lax`,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  }

  @Post('google')
  async google(
    @Res({ passthrough: true }) response: Response,
    @Body() { token }: GoogleTokenDto,
  ) {
    const user = await this.authService.googleAuth(token);
    const { accessToken, refreshToken } =
      await this.authService.generateTokens(user);
    response.cookie(`accessToken`, accessToken, {
      secure: process.env.NODE_ENV !== `development`,
      httpOnly: true,
      sameSite: process.env.NODE_ENV !== `development` ? `none` : `lax`,
      maxAge: 15 * 60 * 1000,
    });
    response.cookie(`refreshToken`, refreshToken, {
      secure: process.env.NODE_ENV !== `development`,
      httpOnly: true,
      sameSite: process.env.NODE_ENV !== `development` ? `none` : `lax`,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return user;
  }
}
