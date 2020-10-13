import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { StreamController } from './stream.controller';
import { INestApplication } from '@nestjs/common';

describe('StreamController', () => {
  let controller: StreamController;
  let app: INestApplication;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StreamController],
    }).compile();

    controller = module.get<StreamController>(StreamController);
    app = module.createNestApplication();
    await app.init();
  });

  it('should throw a Not Found exception if id is not found', () => {
    return request(app.getHttpServer())
      .get('/stream/not-a-song')
      .expect(404)
      .expect({
        message: 'Not Found',
        statusCode: 404
      });
  });
});
