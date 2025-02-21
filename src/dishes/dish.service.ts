import { Injectable, NotFoundException } from '@nestjs/common';
import { Dish } from './Dish';
import { CreateDishDTO } from './dto/create-dish.dto';
import { UpdateDishDTO } from './dto/update-dish.dto';

@Injectable()
export class DishService {
  private trackId = 1;
  private dishes: Dish[] = [
    {
      id: this.trackId++,
      name: 'Pizza',
      description: 'A delicious pizza',
      servings: 4,
    },
  ];

  create(dish: CreateDishDTO) {
    const newDish: Dish = {
      id: this.trackId++,
      ...dish,
    };

    this.dishes.push(newDish);
    return newDish;
  }

  findAll() {
    return this.dishes;
  }

  getOneById(id: number) {
    const dish = this.dishes.find((d) => d.id === id);

    if (!dish) {
      throw new NotFoundException(`Dish id: ${id} not found`);
    }

    return dish;
  }

  update(dish: UpdateDishDTO) {
    const dishToUpdate = this.getOneById(dish.id);
    Object.assign(dishToUpdate, dish);
    return dishToUpdate;
  }

  delete(id: number) {
    this.getOneById(id);
    this.dishes = this.dishes.filter((d) => d.id !== id);
    return { id };
  }
}
