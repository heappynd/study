import { NestMiddleware, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import { Request, Response, NextFunction } from 'express';

const whiteList = [];

function MiddlewareAll(req: Request, res: Response, next: NextFunction) {
  console.log('originalUrl', req.originalUrl);

  if (whiteList.includes(req.originalUrl)) {
    next();
  } else {
    next();
    // res.send('no !!!');
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // 开启版本控制
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.use(
    session({
      secret: 'secret',
      rolling: true,
      // name: ''
      // cookie: { httpOnly: true, maxAge: 1000 },
    }),
  );
  app.use(MiddlewareAll);

  await app.listen(3000);
}
bootstrap();
