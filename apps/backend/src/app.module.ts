import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { AppController } from './app.controller';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [CoreModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
