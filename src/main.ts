import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('AmazonIA Ateliware API')
    .setDescription('Documentação')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.use(
    cors({
      origin: ['http://localhost:4232'],
    }),
  );
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ forbidUnknownValues: false }));
  await app.listen(8080);
}

bootstrap().then();
