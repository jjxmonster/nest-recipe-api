import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Dish } from './Dish';
import { CreateDishDTO } from './dto/create-dish.dto';
import { UpdateDishDTO } from './dto/update-dish.dto';

@Controller('dishes')
export class DishesController {
  private trackId = 0;
  private dishes: Dish[] = [
    {
      id: this.trackId++,
      name: 'Pizza',
      description: 'A delicious pizza',
      servings: 4,
    },
  ];

  @Post()
  createOne(@Body() dish: CreateDishDTO) {
    const newDish: Dish = {
      id: this.trackId++,
      ...dish,
    };

    this.dishes.push(newDish);
    return newDish;
  }

  @Get()
  getDishes() {
    return this.dishes;
  }

  @Put()
  updateOne(@Body() dish: UpdateDishDTO) {
    const dishToUpdate = this.dishes.find((d) => d.id === dish.id);

    if (!dishToUpdate) {
      throw new NotFoundException(`Dish id: ${dish.id} not found`);
    }

    Object.assign(dishToUpdate, dish);

    return dishToUpdate;
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    const dishToDelete = this.dishes.find((d) => d.id === Number(id));

    if (!dishToDelete) {
      throw new NotFoundException(`Dish id: ${id} not found`);
    }

    this.dishes = this.dishes.filter((d) => d.id !== Number(id));

    return {
      message: 'Dish deleted',
    };
  }
}
