import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ChannelModule } from './modules/channel/channel.module';
import { MessageModule } from './modules/message/message.module';

@Module({
  imports: [CoreModule, AuthModule, UserModule, ChannelModule, MessageModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
