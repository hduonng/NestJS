import { registerAs } from '@nestjs/config';
import * as process from 'node:process';
import { AdminJSConfigType } from './types';

export default registerAs<AdminJSConfigType>('adminjs', (): AdminJSConfigType => {
     return {
          user: process.env.ADMINJS_USER,
          password: process.env.ADMINJS_PASSWORD,
          rootPath: process.env.ADMINJS_ROOTPATH,
     };
});
