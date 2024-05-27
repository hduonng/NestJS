import { registerAs } from '@nestjs/config';
import * as process from 'process';
import { LoggerConfigType } from './types';

export default registerAs<LoggerConfigType>('logger', (): LoggerConfigType => {
     return {
          log: {
               logLevel: ['log', 'error', 'warn', 'debug', 'verbose', 'request', 'response', 'exception'],
               logFileEnabled: process.env.LOG_FILE_ENABLED === 'true',
               maxFilesLog: process.env.MAX_FILES_LOG,
               sizeLog: process.env.SIZE_LOG,
               fileName: process.env.LOG_FILE_NAME,
          },
          logStash: {
               enabled: process.env.LOGSTASH_ENABLED === 'true',
               host: String(process.env.LOGSTASH_HOST),
               port: Number(process.env.LOGSTASH_PORT),
               protocol: String(process.env.LOGSTASH_PROTOCOL),
          },
          fluentBit: {
               enabled: process.env.FLUENT_ENABLED === 'true',
               host: String(process.env.FLUENT_HOST),
               port: Number(process.env.FLUENT_PORT),
               protocol: String(process.env.FLUENT_PROTOCOL),
               prefix: String(process.env.FLUENT_PREFIX),
          },
     };
});
