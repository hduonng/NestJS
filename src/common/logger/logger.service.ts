// import { Injectable, LoggerService } from '@nestjs/common';
// import { loggerConfigs } from '../../config/logger.config';
// import { LoggerConstant } from './constant';
// import { WinstonLogger } from './winston/winston.logger';
//
// @Injectable()
// export class MyLogger implements LoggerService {
//      private readonly logger = WinstonLogger.create(loggerConfigs);
//
//      constructor(private readonly from?: string) {}
//
//      public debug(data: any, ...optionalParams: any[]) {
//           return this.logger.debug(JSON.stringify(data), {
//                tags: LoggerConstant.DEBUG,
//                from: this.from ?? LoggerConstant.APOSTROPHE,
//           });
//      }
//
//      public error(data: any, ...optionalParams: any[]) {
//           return this.logger.error(JSON.stringify(data), {
//                tags: LoggerConstant.ERROR,
//                from: this.from ?? LoggerConstant.APOSTROPHE,
//           });
//      }
//
//      public info(message: string, tag?: string, ...optionalParams: any[]): any {
//           return this.logger.info(message, {
//                tags: tag ?? LoggerConstant.INFO,
//                from: this.from ?? LoggerConstant.APOSTROPHE,
//           });
//      }
//
//      public warn(data: any, ...optionalParams: any[]): any {
//           return this.logger.warn(JSON.stringify(data), {
//                tags: LoggerConstant.WARN,
//                from: this.from ?? LoggerConstant.APOSTROPHE,
//           });
//      }
//
//      //Logger process
//      public request(data: any, ...optionalParams: any[]): any {
//           return this.logger.info(JSON.stringify(data), {
//                tags: LoggerConstant.REQUEST,
//                from: this.from ?? LoggerConstant.APOSTROPHE,
//           });
//      }
//
//      public response(data: any, ...optionalParams: any[]) {
//           return this.logger.info(JSON.stringify(data), {
//                tags: LoggerConstant.RESPONSE,
//                from: this.from ?? LoggerConstant.APOSTROPHE,
//           });
//      }
//
//      public exception(data: any, ...optionalParams: any[]): any {
//           return this.logger.info(JSON.stringify(data), {
//                tags: LoggerConstant.EXCEPTION,
//                from: this.from ?? LoggerConstant.APOSTROPHE,
//           });
//      }
//
//      public log(message: any, ...optionalParams: any[]): any {
//           return this.logger.info(message, {
//                tags: LoggerConstant.INFO,
//                from: this.from ?? LoggerConstant.APOSTROPHE,
//           });
//      }
// }
