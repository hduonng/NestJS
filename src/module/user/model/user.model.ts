import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class UserModel {
     @Prop({ type: 'string', required: true })
     name: string;

     @Prop({ type: 'string', required: true })
     email: string;

     @Prop({ type: 'string', required: true })
     address: string;

     @Prop({ type: 'string', required: true })
     role: string;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
