import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

import * as cookieParser from 'cookie-parser';
import * as helmet from 'helmet';
import * as compression from 'compression';

const { wakeDyno } = require('heroku-keep-awake');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  let configService = app.get(ConfigService);

  app.setGlobalPrefix('api');
  app.use(helmet());
  app.enableCors({
    origin: 'https://bettaibi.github.io',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    exposedHeaders: ["set-cookie"],
    allowedHeaders: ['X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept'],
  });
  app.use(compression());
  app.use(cookieParser());

  // View Engine
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  // Swagger Config
  const config = new DocumentBuilder()
  .setTitle('Team board API')
  .setDescription('Team Management App')
  .setVersion('1.0')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const PORT = process.env.PORT || configService.get('PORT');

  app.listen(PORT, ()=> {
    wakeDyno("https://my-team-board.herokuapp.com/");
    console.log(`Application is running on: ${PORT}`);
  });

}

bootstrap();
