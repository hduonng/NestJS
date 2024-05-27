// import * as winston from 'winston';
// import * as Transport from 'winston-transport';
// import { LoggerConfigType } from '../../../config/types';
// import { LoggerConstant } from '../constant';
// import { CreateTransport } from './transport';
// import 'winston-daily-rotate-file';
//
// export class WinstonLogger {
//      constructor() {}
//
//      private static getTransport(loggerConfig: LoggerConfigType) {
//           const fileEnabled: boolean = loggerConfig.log.logFileEnabled;
//           const logStashEnabled: boolean = loggerConfig.logStash.enabled;
//           const fluentBitEnabled: boolean = loggerConfig.fluentBit.enabled;
//
//           const options = {
//                file: {
//                     level: 'info',
//                     datePattern: String(LoggerConstant.DATE_PATTERN),
//                     filename: loggerConfig.log.fileName,
//                     handleExceptions: true,
//                     maxFiles: loggerConfig.log.maxFilesLog,
//                     maxSize: loggerConfig.log.sizeLog,
//                     json: true,
//                },
//                console: {
//                     level: 'info',
//                     handleExceptions: true,
//                     colorize: true,
//                     json: false,
//                },
//           };
//
//           const transports: Transport[] = [new winston.transports.Console(options.console)];
//
//           if (fileEnabled) {
//                const transport = new winston.transports.DailyRotateFile(options.file);
//                transports.push(transport);
//           }
//
//           if (logStashEnabled) {
//                const logStashTransport = CreateTransport.TransportLogstash(loggerConfig);
//                transports.push(logStashTransport);
//           }
//
//           if (fluentBitEnabled) {
//                const fluentBitTransport = CreateTransport.TransportFluentBit(loggerConfig);
//                transports.push(fluentBitTransport);
//           }
//
//           return transports;
//      }
//
//      private static getOptions(loggerConfig: LoggerConfigType) {
//           return {
//                level: 'info',
//                format: winston.format.combine(
//                     winston.format.splat(),
//                     winston.format.timestamp({
//                          format: String(LoggerConstant.TIME_STAMP),
//                     }),
//                     winston.format.printf((info: winston.Logform.TransformableInfo) => {
//                          return this.winstonFormat(info);
//                     }),
//                ),
//                transports: this.getTransport(loggerConfig),
//                exitOnError: false,
//           };
//      }
//
//      private static winstonFormat(info: winston.Logform.TransformableInfo) {
//           const level: string = 'info';
//           const tag: string = (!info.tags ? `${LoggerConstant.DEFAULT_TAG}` : info.tags).toUpperCase();
//
//           const result: string = `[${tag}] - ${info.timestamp} - [${level}] - [FROM: ${info.from}]: ${info.message}`;
//
//           return result;
//      }
//
//      public static create(loggerConfig: LoggerConfigType) {
//           return winston.createLogger(this.getOptions(loggerConfig));
//      }
// }
