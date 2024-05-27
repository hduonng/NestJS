import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AllConfigType } from '../config/types';
import { AdminjsService } from './adminjs.service';

@Module({
     imports: [
          import('@adminjs/nestjs').then(({ AdminModule }) =>
               AdminModule.createAdminAsync({
                    imports: [ConfigModule],
                    inject: [ConfigService],
                    useFactory: async (configService: ConfigService<AllConfigType>) => {
                         const AdminJSService = new AdminjsService(configService);
                         return {
                              adminJsOptions: await AdminJSService.AdminJSOptions(),
                              auth: await AdminJSService.Auth(),
                              sessionOptions: {
                                   resave: true,
                                   saveUninitialized: true,
                                   secret: 'secret',
                              },
                         };
                    },
               }),
          ),
     ],

     providers: [AdminjsService],
})
export class AdminjsModule {}
