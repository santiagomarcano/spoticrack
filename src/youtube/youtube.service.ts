import { Injectable } from '@nestjs/common';
import { createWriteStream } from 'fs';
import { join } from 'path';

const ydtl = require('ytdl-core');
const ffmpeg = require('ffmpeg')

@Injectable()
export class YoutubeService {

  async download({ name, folder, url }: { name: string; folder: string; url: string; }) {
    return new Promise((resolve, reject) => {
      const readable = ydtl(url)
        .pipe(createWriteStream(join(process.cwd(), folder, name)))
      readable.on('data', (data) => {
        console.log(data)
      })
      readable.on('close', () => {
        return resolve(name)
      })
      readable.on('error', (data) => {
        return reject(data)
      })
    })
  }

  async toMp3({ path, output }: { path: string, output: string }) {
    return new Promise((resolve, reject) => {
      const process = new ffmpeg(path)
      process.then(video => {

        video.fnExtractSoundToMP3(output, (err, files) => {
          if (err) {
            reject(err)
          }
          resolve(files)
        })
      })
    })
  }
}
