import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { WinstonModuleOptions, WinstonModuleOptionsFactory } from 'nest-winston';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import * as winston from 'winston';
import * as Transport from 'winston-transport';
import LoggerConfig from '../../config/logger.config';
import { LoggerConstant } from '../logger/constant';
import { CreateTransport } from './transport';

@Injectable()
export class WinstonOptions implements WinstonModuleOptionsFactory {
     constructor(
          @Inject(LoggerConfig.KEY) private readonly loggerConfig: ConfigType<typeof LoggerConfig>,
          private readonly createTransport: CreateTransport,
     ) {}

     createWinstonModuleOptions(): Promise<WinstonModuleOptions> | WinstonModuleOptions {
          const fileEnabled: boolean = this.loggerConfig.log.logFileEnabled;
          const logStashEnabled: boolean = this.loggerConfig.logStash.enabled;
          const fluentBitEnabled: boolean = this.loggerConfig.fluentBit.enabled;

          const options = {
               file: {
                    level: 'info',
                    datePattern: String(LoggerConstant.DATE_PATTERN),
                    filename: this.loggerConfig.log.fileName,
                    handleExceptions: true,
                    maxFiles: this.loggerConfig.log.maxFilesLog,
                    maxSize: this.loggerConfig.log.sizeLog,
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
               const logStashTransport = this.createTransport.TransportLogstash();
               transports.push(logStashTransport);
          }

          if (fluentBitEnabled) {
               const fluentBitTransport = this.createTransport.TransportFluentBit();
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
          } as WinstonModuleOptions;
     }
}
