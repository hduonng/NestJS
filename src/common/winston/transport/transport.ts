import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import LoggerConfig from '../../../config/logger.config';
import { LoggerConstant } from '../../logger/constant';
import { TypeTransportsOptions } from '../../logger/type';
import { TransportOptions } from './transport.options';

@Injectable()
export class CreateTransport {
     constructor(@Inject(LoggerConfig.KEY) private readonly loggerConfig: ConfigType<typeof LoggerConfig>) {}

     /**
      * ELK Transport
      * */
     public TransportLogstash() {
          const host: string = this.loggerConfig.logStash.host;
          const port: number = this.loggerConfig.logStash.port;
          const protocol: string = this.loggerConfig.logStash.protocol;

          if (!host) {
               throw new Error('');
          }
          if (!port && !Number.isInteger(port)) {
               throw new Error('');
          }
          if (!protocol && protocol != LoggerConstant.PROTOCOL_UDP && protocol != LoggerConstant.PROTOCOL_TCP) {
               throw new Error('');
          }

          const options: TypeTransportsOptions = {
               host: host,
               port: port,
               protocol: protocol as LoggerConstant.PROTOCOL_TCP | LoggerConstant.PROTOCOL_UDP,
               handleExceptions: true,
          };

          return new TransportOptions(options);
     }

     /**
      * EFK Transport
      * */
     public TransportFluentBit() {
          const host: string = this.loggerConfig.fluentBit.host;
          const port: number = this.loggerConfig.fluentBit.port;
          const protocol: string = this.loggerConfig.fluentBit.protocol;
          const prefix: string = this.loggerConfig.fluentBit.prefix;

          if (!host) {
               throw new Error('');
          }
          if (!port && !Number.isInteger(port)) {
               throw new Error('');
          }
          if (
               !protocol &&
               protocol != LoggerConstant.PROTOCOL_UDP &&
               protocol != LoggerConstant.PROTOCOL_TCP &&
               protocol != LoggerConstant.PROTOCOL_PORT
          ) {
               throw new Error('');
          }

          const options: TypeTransportsOptions = {
               host: host,
               port: port,
               protocol: protocol as
                    | LoggerConstant.PROTOCOL_UDP
                    | LoggerConstant.PROTOCOL_TCP
                    | LoggerConstant.PROTOCOL_PORT,
               handleExceptions: true,
               fluentPrefix: prefix,
          };

          return new TransportOptions(options);
     }
}
