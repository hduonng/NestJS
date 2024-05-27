import { TransportStreamOptions } from 'winston-transport';
import { LoggerConstant } from '../constant';

export interface ServerTransportInformation {
     host?: string;
     port?: number;
     protocol?: LoggerConstant.PROTOCOL_UDP | LoggerConstant.PROTOCOL_TCP | LoggerConstant.PROTOCOL_PORT;
     fluentPrefix?: string;
}

export type TypeTransportsOptions = ServerTransportInformation & TransportStreamOptions;
