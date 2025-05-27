import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../../core/auth/auth.guard';
import { ParseCookieInterceptor } from './interceptors/parse-cookie.interceptor';
import { Request } from 'express';

@Controller(`user`)
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseInterceptors(ParseCookieInterceptor)
  async getUser(@Req() req: Request & { user?: string }) {
    if (!req.user) {
      throw new BadRequestException();
    }
    const user = await this.userService.findOne({ email: req.user });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }
}
