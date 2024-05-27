import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import mongoose from 'mongoose';
import { AllConfigType } from '../config/types';
import { ProductSchema } from '../module/product/model';
import { UserSchema } from '../module/user/model';

@Injectable()
export class AdminjsService {
     constructor(private readonly configService: ConfigService<AllConfigType>) {}

     private async getDatabase() {
          return await mongoose.connect(this.configService.getOrThrow('mongodb.uri', { infer: true }));
     }

     public async AdminJSOptions() {
          const AdminJS = (await import('adminjs')).AdminJS;
          const AdminJSMongoose = await import('@adminjs/mongoose');

          AdminJS.registerAdapter({
               Database: AdminJSMongoose.Database,
               Resource: AdminJSMongoose.Resource,
          });

          const db = await this.getDatabase();

          return new AdminJS({
               dashboard: {},
               databases: [db],
               resources: [
                    {
                         resource: db.model('User', UserSchema),
                         options: {},
                    },

                    {
                         resource: db.model('Product', ProductSchema),
                         options: {},
                    },
               ],
               rootPath: this.configService.getOrThrow('adminjs.rootPath', { infer: true }),
          });
     }

     public async Auth() {
          const DEFAULT_ADMIN = {
               email: this.configService.getOrThrow('adminjs.user', { infer: true }),
               password: this.configService.getOrThrow('adminjs.password', { infer: true }),
          };

          const authenticate = async (email: string, password: string) => {
               if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
                    return Promise.resolve(DEFAULT_ADMIN);
               }
               return null;
          };

          return {
               authenticate,
               cookieName: 'adminjs',
               cookiePassword: 'secret',
          };
     }
}
