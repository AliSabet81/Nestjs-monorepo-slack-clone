import { Message } from '@prisma/client';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateMessageDto
  implements Pick<Message, 'content' | 'channelId' | 'userId'>
{
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsInt()
  channelId: number;

  @IsInt()
  userId: number;
}
