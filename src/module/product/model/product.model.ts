import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { model } from 'mongoose';

@Schema()
export class ProductModel {
     @Prop({ type: 'string', required: true })
     name: string;

     @Prop({ type: 'number', required: true })
     quantity: number;
}

export const ProductSchema = SchemaFactory.createForClass(ProductModel);
export const ProductDoc = model('Product', ProductSchema);
