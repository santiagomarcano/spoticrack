import { Test, TestingModule } from '@nestjs/testing';
import { YoutubeService } from './youtube.service';
import { readdir, remove } from 'fs-extra';
import { join } from 'path';

jest.setTimeout(30000);

describe('YoutubeService', () => {
  let service: YoutubeService;
  const folder: string = 'test-assets';
  const url: string = 'https://www.youtube.com/watch?v=c0ruHxX7r3M';
  const name: string = 'test-video.mp4';
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [YoutubeService],
    }).compile();

    service = module.get<YoutubeService>(YoutubeService);
  });

  it('should download video from youtube using url and set its correct name on given folder', async () => {
    try {
      const testName = 'test-video-IT.mp4'
      await remove(join(process.cwd(), folder, testName))
      const video = await service.download({ name: `test-video-IT.mp4`, folder, url })
      const folderFiles = await readdir(join(process.cwd(), folder))
      expect(folderFiles).toContain(video)
    } catch (err) {
      throw new Error(err)
    }
  });

  it('should convert a given video to mp3 on given folder', async () => {
    try {
      const audioFile = 'test-audio.mp3'
      await remove(join(process.cwd(), folder, audioFile))
      const path = join(process.cwd(), folder, name)
      const output = join(process.cwd(), folder, audioFile)
      const files = await service.toMp3({ path, output })
      expect(files).toContain(audioFile)
    } catch (err) {
      throw new Error(err)
    }
  })
});
