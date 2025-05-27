import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ChannelModule } from './modules/channel/channel.module';

@Module({
  imports: [CoreModule, AuthModule, UserModule, ChannelModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
