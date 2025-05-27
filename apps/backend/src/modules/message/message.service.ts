import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { DatabaseService } from '../../database/database.service';

@Injectable()
export class MessageService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createMessageDto: CreateMessageDto) {
    return await this.databaseService.message.create({
      data: createMessageDto,
      include: {
        user: true,
      },
    });
  }
}
