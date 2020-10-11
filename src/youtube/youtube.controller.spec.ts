import { Test, TestingModule } from '@nestjs/testing';
import { YoutubeController } from './youtube.controller';
import { YoutubeService } from './youtube.service';

jest.setTimeout(30000);

describe('YoutubeController', () => {
  let controller: YoutubeController;
  const folder: string = 'test-assets';
  const url: string = 'https://www.youtube.com/watch?v=c0ruHxX7r3M';
  const name: string = 'test-video-CONTROLLER.mp4';
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [YoutubeController],
      providers: [YoutubeService]
    }).compile();

    controller = module.get<YoutubeController>(YoutubeController);
  });

  it('should download the given Youtube video and convert it to mp3', async () => {
    const result = await controller.download({ name, url, folder });
    expect(result).toBeTruthy();
  });

});
