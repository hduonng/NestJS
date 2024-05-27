import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './model';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
     imports: [
          MongooseModule.forFeature([
               {
                    schema: UserSchema,
                    name: 'User',
               },
          ]),
     ],
     providers: [UserService],
     controllers: [UserController],
})
export class UserModule {}
