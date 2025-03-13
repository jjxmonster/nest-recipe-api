import { Module } from '@nestjs/common';
import { DishesController } from './dishes/dishes.controller';
import { ProductsController } from './products/products.controller';
import { DishService } from './dishes/dish.service';
import { ProductService } from './products/product.service';
import { Product } from './products/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dish } from './dishes/dish.entity';
import { IngredientController } from './ingredients/ingredient.controller';
import { Ingredient } from './ingredients/ingredient.entity';
import { IngredientService } from './ingredients/ingredient.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Dish, Ingredient])],
  controllers: [DishesController, ProductsController, IngredientController],
  providers: [DishService, ProductService, IngredientService],
})
export class RecipeModule {}
