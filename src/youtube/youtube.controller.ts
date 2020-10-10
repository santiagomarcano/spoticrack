import { Body, Controller, Post } from '@nestjs/common';

import { YoutubeService } from './youtube.service';

@Controller('youtube')
export class YoutubeController {

  constructor(private youtubeService: YoutubeService) { }

  @Post()
  async download(@Body() body) {
    try {
      console.log('Empezaos')
      const res = await this.youtubeService.download(body)
      console.log('La respuesta', res)
      return res
    } catch (err) {
      return err
    }
  }
}
