import { Module } from '@nestjs/common';
import { DishesController } from './dishes/dishes.controller';
import { ProductsController } from './products/products.controller';
import { DishService } from './dishes/dish.service';
import { ProductService } from './products/product.service';

@Module({
  controllers: [DishesController, ProductsController],
  providers: [DishService, ProductService],
})
export class RecipeModule {}
