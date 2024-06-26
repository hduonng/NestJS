import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserModel } from './model';

@Injectable()
export class UserService {
     constructor(@InjectModel('User') private readonly userModel: Model<UserModel>) {}

     public async findUser() {
          return this.userModel.find({});
     }
}
