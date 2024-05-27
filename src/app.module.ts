import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ResponseInterceptor } from './common/interceptor/response.interceptor';
import AdminjsConfig from './config/adminjs.config';
import AppConfig from './config/app.config';
import LoggerConfig from './config/logger.config';
import MongodbConfig from './config/mongodb.config';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './module/user/user.module';
import { AdminjsModule } from './adminjs/adminjs.module';
import { ProductModule } from './module/product/product.module';
import { RequestLogMiddleware } from './shared/middleware';
import { WinstonModules } from './common/winston/winston.module';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
     imports: [
          DatabaseModule,
          ConfigModule.forRoot({
               isGlobal: true,
               load: [AppConfig, MongodbConfig, AdminjsConfig, LoggerConfig],
               envFilePath: ['.env'],
          }),
          UserModule,
          AdminjsModule,
          ProductModule,
          WinstonModules,
     ],
     controllers: [],
     providers: [
          {
               provide: APP_INTERCEPTOR,
               useClass: ResponseInterceptor,
          },
     ],
})
export class AppModule implements NestModule {
     configure(consumer: MiddlewareConsumer): any {
          consumer.apply(RequestLogMiddleware).forRoutes('*');
     }
}
