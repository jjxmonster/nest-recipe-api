import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DishesController } from './dishes/dishes.controller';
import { ProductsController } from './products/products.controller';

@Module({
  imports: [],
  controllers: [AppController, DishesController, ProductsController],
  providers: [AppService],
})
export class AppModule {}
