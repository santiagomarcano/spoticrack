import { Test, TestingModule } from '@nestjs/testing';
import { YoutubeService } from './youtube.service';
import { pathExists, remove, readdir } from 'fs-extra';
import { join } from 'path';

jest.setTimeout(50000);

describe('YoutubeService', () => {
  let service: YoutubeService;
  const folder: string = 'test-assets';
  const url: string = 'https://www.youtube.com/watch?v=c0ruHxX7r3M';
  const name: string = 'test-video.mp4';
  const testName: string = 'test-video-SERVICE.mp4'
  const audioFile: string = 'test-audio-SERVICE.mp3'
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [YoutubeService],
    }).compile();

    service = module.get<YoutubeService>(YoutubeService);
  });

  it('should validate URL before attempt to download', async () => {
    try {
      const video = await service.download({ name: `test-video-SERVICE.mp4`, folder, url: 'obviously-wrong-url' })
      expect(video).toBe('wrong url')
    } catch (err) {
      throw new Error(err)
    }
  })

  it('should download video from youtube using url and set its correct name on given folder', async () => {
    try {
      await remove(join(process.cwd(), folder, testName));
      const videoLocation = await service.download({ name: `test-video-SERVICE.mp4`, folder, url });
      const exists = await pathExists(videoLocation);
      expect(exists).toBeTruthy();
    } catch (err) {
      throw new Error(err);
    }
  });

  it('should convert a given video to mp3 on given folder', async () => {
    try {
      await remove(join(process.cwd(), folder, audioFile));
      const path = join(process.cwd(), folder, name);
      const output = join(process.cwd(), folder, audioFile);
      const result = await service.toMp3({ path, output, keepVideo: true });
      expect(result.files).toContain(audioFile);
    } catch (err) {
      console.log(err)
      throw new Error(err);
    }
  })

  it('should erase the video after mp3 conversion', async () => {
    await remove(join(process.cwd(), folder, 'remove-test.mp3'));
    const videoLocation = await service.download({ name: `test-video-SERVICE-REMOVE.mp4`, folder, url });
    const output = join(process.cwd(), folder, 'remove-test.mp3');
    await service.toMp3({ path: videoLocation, output });
    const exists = await pathExists(videoLocation);
    expect(exists).toBeFalsy()
  })
});
