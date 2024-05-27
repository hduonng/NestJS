import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import mongoose from 'mongoose';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AppModule } from './app.module';
import { AllConfigType } from './config/types';

async function bootstrap() {
     mongoose.set('debug', true);

     const app = await NestFactory.create<NestExpressApplication>(AppModule, {
          logger: Logger,
          bufferLogs: false,
          autoFlushLogs: true,
     });

     app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

     const configService = app.get(ConfigService<AllConfigType>);

     const host: string = configService.getOrThrow('app.host', { infer: true });
     const port: number = configService.getOrThrow('app.port', { infer: true });
     const prefix: string = configService.getOrThrow('app.prefix', { infer: true });

     app.setGlobalPrefix(prefix);

     await app.listen(port, host, () => {
          Logger.log(`Listening on : ${host}:${port}`, 'NestApplication');
     });
}

void bootstrap();
