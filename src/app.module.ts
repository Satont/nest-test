import { Injectable, MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NextFunction } from 'express';
import { Request, Response } from 'express';
import { NestjsFormDataModule } from 'nestjs-form-data';

@Injectable()
class Middleware {
  use(req: Request, res: Response, next: NextFunction) {
    return next();
  }
}

@Module({
  imports: [NestjsFormDataModule.config({ isGlobal: true })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(Middleware).forRoutes('*');
  }
}
