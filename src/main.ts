process.env.NODE_ENV = 'production';

import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableShutdownHooks();
  app.getHttpAdapter().getInstance().disable('x-powered-by');
  app.getHttpAdapter().getInstance().set('etag', false);
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: false }));
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Benefit manager')
    .setDescription('Benefit manager api')
    .setVersion(process.env.npm_package_version ?? '1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);
  await app.init();
  await app.listen(3000);
}
bootstrap();
