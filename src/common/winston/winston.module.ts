import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as winston from 'winston';
import * as Transport from 'winston-transport';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import { AllConfigType } from '../../config/types';
import { LoggerConstant } from '../logger/constant';
import { CreateTransport } from './transport';
import { WinstonModule } from 'nest-winston';
import('winston-daily-rotate-file');

@Module({
     imports: [
          WinstonModule.forRootAsync({
               imports: [ConfigModule],
               inject: [ConfigService],
               useFactory: async (configService: ConfigService<AllConfigType>) => {
                    const loggerConfig = configService.getOrThrow('logger', { infer: true });
                    const transport = new CreateTransport(loggerConfig);

                    const fileEnabled: boolean = loggerConfig.log.logFileEnabled;
                    const logStashEnabled: boolean = loggerConfig.logStash.enabled;
                    const fluentBitEnabled: boolean = loggerConfig.fluentBit.enabled;

                    const options = {
                         file: {
                              level: 'info',
                              datePattern: String(LoggerConstant.DATE_PATTERN),
                              filename: loggerConfig.log.fileName,
                              handleExceptions: true,
                              maxFiles: loggerConfig.log.maxFilesLog,
                              maxSize: loggerConfig.log.sizeLog,
                              json: true,
                         },
                         console: {
                              level: 'info',
                              handleExceptions: true,
                              format: winston.format.combine(
                                   winston.format.colorize(),
                                   winston.format.timestamp({
                                        format: String(LoggerConstant.TIME_STAMP),
                                   }),
                                   nestWinstonModuleUtilities.format.nestLike('NestJS-Basic', {
                                        prettyPrint: true,
                                        colors: true,
                                        processId: true,
                                   }),
                                   winston.format.printf((info: winston.Logform.TransformableInfo) => {
                                        const tag: string = !info.tags ? `${LoggerConstant.DEFAULT_TAG}` : info.tags;
                                        return `[${tag}] - ${info.timestamp} - [${info.level}] - [${info.context || 'NestApplication'}]: ${info.message}`;
                                   }),
                              ),
                         },
                    };

                    const transports: Transport[] = [new winston.transports.Console(options.console)];

                    if (fileEnabled) {
                         const fileTransport = new winston.transports.DailyRotateFile(options.file);
                         transports.push(fileTransport);
                    }

                    if (logStashEnabled) {
                         const logStashTransport = transport.TransportLogstash();
                         transports.push(logStashTransport);
                    }

                    if (fluentBitEnabled) {
                         const fluentBitTransport = transport.TransportFluentBit();
                         transports.push(fluentBitTransport);
                    }

                    return {
                         level: 'info',
                         format: winston.format.combine(
                              winston.format.splat(),
                              winston.format.timestamp({
                                   format: String(LoggerConstant.TIME_STAMP),
                              }),
                              nestWinstonModuleUtilities.format.nestLike('NestJS-Basic', {
                                   prettyPrint: true,
                                   colors: true,
                                   processId: true,
                              }),
                              winston.format.printf((info: winston.Logform.TransformableInfo) => {
                                   const tag: string = !info.tags ? `${LoggerConstant.DEFAULT_TAG}` : info.tags;
                                   return `[${tag}] - ${info.timestamp} - [${info.level.toUpperCase()}] - [${info.context || 'NestApplication'}]: ${info.message}`;
                              }),
                         ),
                         exitOnError: false,
                         transports: transports,
                    };
               },
          }),
     ],
     providers: [CreateTransport],
})
export class WinstonModules {}
