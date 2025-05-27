import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Server, Socket } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth/auth.guard';
import * as cookie from 'cookie';
import { JwtService } from '@nestjs/jwt';

@WebSocketGateway({
  cors: {
    origin: true,
    credentials: true,
  },
})
export class MessageGateway {
  constructor(
    private readonly messageService: MessageService,
    private readonly jwtService: JwtService,
  ) {}

  @WebSocketServer()
  server: Server;

  async handleConnection(client: Socket) {
    const cookies = client.handshake.headers.cookie;
    if (!cookies) {
      client.emit('auth_error', 'No cookies provided');
      client.disconnect();
      return;
    }

    const parsedCookies = cookie.parse(cookies);
    const accessToken = parsedCookies['accessToken'];

    if (!accessToken) {
      client.emit('auth_error', 'No access token provided');
      client.disconnect();
      return;
    }
    try {
      await this.jwtService.verifyAsync(accessToken);
    } catch (error) {
      console.error(error);
      client.emit('auth_error', 'Invalid access token');
      client.disconnect();
    }
  }

  @UseGuards(AuthGuard)
  @SubscribeMessage('createMessage')
  async create(@MessageBody() createMessageDto: CreateMessageDto) {
    const message = await this.messageService.create(createMessageDto);
    this.server.emit('newMessage', message);
  }
}
