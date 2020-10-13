import { Controller, Get, Param, Res, Req, HttpException, HttpStatus } from '@nestjs/common';
import { createReadStream, statSync } from 'fs';
import { join } from 'path';
import { Response, Request } from 'express';

@Controller('stream')
export class StreamController {

  @Get(':id')
  track(@Param() { id }, @Req() req: Request, @Res() res: Response) {
    try {
      const route = join(process.cwd(), 'assets', id);
      const stat = statSync(route);
      const total = stat.size;
      if (req.headers.range) {
        const range = req.headers.range;
        const [partialStart, partialEnd] = range.replace(/bytes=/, "").split("-");
        const start = parseInt(partialStart, 10);
        const end = partialEnd ? parseInt(partialEnd, 10) : total - 1;
        const chunksize = (end - start) + 1;
        const readStream = createReadStream(route, { start: start, end: end });
        res.writeHead(206, {
          'Content-Range': 'bytes ' + start + '-' + end + '/' + total,
          'Accept-Ranges': 'bytes', 'Content-Length': chunksize,
          'Content-Type': 'video/mp4'
        });
        readStream.pipe(res);
      } else {
        res.writeHead(200, { 'Content-Length': total, 'Content-Type': 'audio/mpeg' });
        createReadStream(route).pipe(res);
      }
    } catch (err) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
  }
}
