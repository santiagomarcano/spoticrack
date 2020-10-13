import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

interface UserRecord {
  uid: string;
  email: string;
  displayName: string;
  toJSON: Function;
}

@Injectable()
export class FirebaseService {
  
  async getUsers() {
    try {
      const result = await admin.auth().listUsers(1000)
      return result.users.map(user => user.toJSON())
    } catch (err) {
      return err
    }
  }
}
