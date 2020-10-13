import { Test, TestingModule } from '@nestjs/testing';
import { FirebaseService } from './firebase.service';

import { ConfigModule, ConfigService } from '@nestjs/config';

// Import firebase-admin
import * as admin from 'firebase-admin';
import { ServiceAccount } from "firebase-admin";
import { INestApplication } from '@nestjs/common';

describe('FirebaseService', () => {
  let service: FirebaseService;
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ isGlobal: true })],
      providers: [FirebaseService],
    }).compile();
    app = module.createNestApplication();
    await app.init();
    service = module.get<FirebaseService>(FirebaseService);
    const configService: ConfigService = app.get(ConfigService);
    const adminConfig: ServiceAccount = {
      "projectId": configService.get<string>('FIREBASE_PROJECT_ID'),
      "privateKey": configService.get<string>('FIREBASE_PRIVATE_KEY')
        .replace(/\\n/g, '\n'),
      "clientEmail": configService.get<string>('FIREBASE_CLIENT_EMAIL'),
    };
    admin.initializeApp({
      credential: admin.credential.cert(adminConfig),
      databaseURL: "https://xxxxx.firebaseio.com",
    });
  });

  it('should retrieve users from firebase', async () => {
    try {
      const users = await service.getUsers();
      console.log(users)
      expect(users).toBeTruthy()
    } catch (err) {
      console.log(err)
      throw new Error(err)
    }
  })
});
