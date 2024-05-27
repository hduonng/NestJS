import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModel, ProductSchema } from './model';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';

@Module({
     imports: [
          MongooseModule.forFeature([
               {
                    schema: ProductSchema,
                    name: ProductModel.name,
               },
          ]),
     ],
     providers: [ProductService],
     controllers: [ProductController],
})
export class ProductModule {}
