import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { YoutubeModule } from './youtube/youtube.module';
import { StreamModule } from './stream/stream.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), YoutubeModule, StreamModule, SharedModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
