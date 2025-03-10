import { Injectable, NotFoundException } from '@nestjs/common';
import { Dish } from './Dish';
import { CreateDishDTO } from './dto/create-dish.dto';
import { UpdateDishDTO } from './dto/update-dish.dto';

@Injectable()
export class DishService {
  create(dish: CreateDishDTO): Promise<Dish> {
    const newDish = new Dish();
    Object.assign(newDish, dish);
    return newDish.save();
  }

  getAll(): Promise<Dish[]> {
    return Dish.find();
  }

  async getOneById(id: number): Promise<Dish> {
    const dish = await Dish.findOneBy({ id });

    if (!dish) {
      throw new NotFoundException(`Dish id: ${id} not found`);
    }

    return dish;
  }

  async update(dish: UpdateDishDTO): Promise<Dish> {
    const dishToUpdate = await this.getOneById(dish.id);
    Object.assign(dishToUpdate, dish);
    return dishToUpdate.save();
  }

  async delete(id: number): Promise<Dish> {
    const dishToDelete = await this.getOneById(id);
    return dishToDelete.remove();
  }
}
