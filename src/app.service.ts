import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async getHello(id?: string) {
    return `Hello ${id ?? 'world'} ${Date.now()}`;
  }
}
