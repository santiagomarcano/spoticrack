import { Body, Controller, Get, Post } from '@nestjs/common';
import { YoutubeService } from './youtube.service';
import { join } from 'path'
import { DownloadVideo } from './download-video.dto';

@Controller('youtube')
export class YoutubeController {

  constructor(private youtubeService: YoutubeService) { }

  @Post()
  async download(@Body() { name, folder, url }: DownloadVideo) {
    try {
      const videoLocation: string = await this.youtubeService.download({ name, folder, url })
      const audio = await this.youtubeService.toMp3(
        { path: videoLocation, output: join(process.cwd(), folder, name.replace('mp4', 'mp3')) }
      )
      return audio
    } catch (err) {
      return err
    }
  }

  @Get()
  async test(@Body() body) {
    return 'redmi'
  }
}
