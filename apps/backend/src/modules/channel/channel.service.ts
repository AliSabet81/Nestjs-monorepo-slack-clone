import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';

@Injectable()
export class ChannelService {
  constructor(private readonly databaseService: DatabaseService) {}
  async findAll() {
    const channels = await this.databaseService.channel.findMany({
      include: {
        messages: {
          include: {
            user: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });
    return channels;
  }

  async findOne(id: number) {
    return await this.databaseService.channel.findUnique({
      where: {
        id,
      },
      include: {
        messages: {
          include: {
            user: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });
  }
}
