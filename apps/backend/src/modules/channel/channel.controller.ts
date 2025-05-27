import { Controller, Get, UseGuards } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { AuthGuard } from '../../core/auth/auth.guard';

@Controller('channel')
@UseGuards(AuthGuard)
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  @Get()
  findAll() {
    return this.channelService.findAll();
  }
}
