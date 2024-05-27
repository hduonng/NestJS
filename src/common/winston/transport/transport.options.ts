import { configure, emit } from 'fluent-logger';
import dgram from 'node:dgram';
import net from 'node:net';
import TransportStream from 'winston-transport';
import { LoggerConstant } from '../../logger/constant';
import { TypeTransportsOptions } from '../../logger/type';

export class TransportOptions extends TransportStream {
     private readonly host: string;
     private readonly port: number;
     private readonly protocol:
          | LoggerConstant.PROTOCOL_UDP
          | LoggerConstant.PROTOCOL_TCP
          | LoggerConstant.PROTOCOL_PORT;
     private readonly fluentPrefix?: string;

     constructor(private readonly opts: TypeTransportsOptions) {
          super();
          this.host = this.opts.host;
          this.port = this.opts.port;
          this.protocol = this.opts.protocol;
          this.fluentPrefix = this.opts.fluentPrefix;
     }

     public log(info: any, next: () => void): void {
          setImmediate(() => {
               this.emit(`${LoggerConstant.EMIT_EVENT}`, info);
          });

          if (this.protocol === LoggerConstant.PROTOCOL_TCP) {
               this.sendLogByTcp(info);
          } else if (this.protocol === LoggerConstant.PROTOCOL_UDP) {
               this.sendLogByUdp(info);
          } else {
               this.sendLogByPort(info);
          }

          next();
     }

     public sendLogByTcp(info: any): void {
          const message: string = this.getMessage(info);
          const client = net
               .createConnection({ host: this.host, port: this.port }, function () {
                    client.write(message, (err) => {
                         client.destroy();
                         if (err) {
                              throw err;
                         }
                    });
               })
               .on(`${LoggerConstant.CLIENT_ERROR_EVENT}`, function (err) {
                    throw err;
               });
     }

     public sendLogByUdp(info: any): void {
          const message: string = this.getMessage(info);
          const data = Buffer.from(message);
          const client = dgram.createSocket(`${LoggerConstant.TYPE_SOCKET}`);

          client.send(data, this.port, this.host, function (error) {
               client.close();
               if (error) {
                    throw error;
               }
          });
     }

     public sendLogByPort(info: any): void {
          const message: string = this.getMessage(info);

          configure(this.fluentPrefix, {
               host: this.host,
               port: this.port,
               timeout: Number(LoggerConstant.TIME_OUT),
               reconnectInterval: Number(LoggerConstant.RECONNECT_INTERVAL),
          });

          emit(`${LoggerConstant.APPLICATION_MONITOR}`, JSON.parse(message));
     }

     public getMessage(info: any): string {
          if (info.exception) {
               info = {
                    message: info.message,
                    level: info.level,
                    tags: [LoggerConstant.EXCEPTION],
               };
          }
          if (info.tags) {
               info[`${LoggerConstant.INFO_TAG}`] = info.tags;
               delete info.tags;
          }
          if (info.level) {
               info[`${LoggerConstant.INFO_LEVEL}`] = info.level;
               delete info.level;
          }
          info[`${LoggerConstant.INFO_FROM}`] = info.from;
          delete info.from;
          return JSON.stringify(info);
     }
}
