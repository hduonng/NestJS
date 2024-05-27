import { AdminJSConfigType } from './admin.config.type';
import { AppConfigType } from './app.config.type';
import { LoggerConfigType } from './logger.config.type';
import { MongoConfigType } from './mongo.config.type';

export * from './mongo.config.type';
export * from './app.config.type';
export * from './admin.config.type';
export * from './logger.config.type';

export type AllConfigType = {
     app: AppConfigType;
     mongodb: MongoConfigType;
     adminjs: AdminJSConfigType;
     logger: LoggerConfigType;
};
