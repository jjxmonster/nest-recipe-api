import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DishesController } from './dishes/dishes.controller';

@Module({
  imports: [],
  controllers: [AppController, DishesController],
  providers: [AppService],
})
export class AppModule {}
