// import { LoggerConfigType } from '../../../config/types';
// import { LoggerConstant } from '../constant';
// import { TypeTransportsOptions } from '../type';
// import { TransportOptions } from './transport.options';
//
// export class CreateTransport {
//      constructor() {}
//
//      /**
//       * ELK Transport
//       * */
//      public static TransportLogstash(loggerConfig: LoggerConfigType) {
//           const host: string = loggerConfig.logStash.host;
//           const port: number = loggerConfig.logStash.port;
//           const protocol: string = loggerConfig.logStash.protocol;
//
//           if (!host) {
//                throw new Error('');
//           }
//           if (!port && !Number.isInteger(port)) {
//                throw new Error('');
//           }
//           if (!protocol && protocol != LoggerConstant.PROTOCOL_UDP && protocol != LoggerConstant.PROTOCOL_TCP) {
//                throw new Error('');
//           }
//
//           const options: TypeTransportsOptions = {
//                host: host,
//                port: port,
//                protocol: protocol as LoggerConstant.PROTOCOL_TCP | LoggerConstant.PROTOCOL_UDP,
//                handleExceptions: true,
//           };
//
//           return new TransportOptions(options);
//      }
//
//      /**
//       * EFK Transport
//       * */
//      public static TransportFluentBit(loggerConfig: LoggerConfigType) {
//           const host: string = loggerConfig.fluentBit.host;
//           const port: number = loggerConfig.fluentBit.port;
//           const protocol: string = loggerConfig.fluentBit.protocol;
//           const prefix: string = loggerConfig.fluentBit.prefix;
//
//           if (!host) {
//                throw new Error('');
//           }
//           if (!port && !Number.isInteger(port)) {
//                throw new Error('');
//           }
//           if (
//                !protocol &&
//                protocol != LoggerConstant.PROTOCOL_UDP &&
//                protocol != LoggerConstant.PROTOCOL_TCP &&
//                protocol != LoggerConstant.PROTOCOL_PORT
//           ) {
//                throw new Error('');
//           }
//
//           const options: TypeTransportsOptions = {
//                host: host,
//                port: port,
//                protocol: protocol as
//                     | LoggerConstant.PROTOCOL_UDP
//                     | LoggerConstant.PROTOCOL_TCP
//                     | LoggerConstant.PROTOCOL_PORT,
//                handleExceptions: true,
//                fluentPrefix: prefix,
//           };
//
//           return new TransportOptions(options);
//      }
// }
