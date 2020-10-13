import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { YoutubeModule } from './youtube/youtube.module';
import { StreamModule } from './stream/stream.module';

@Module({
  imports: [YoutubeModule, StreamModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
