import { Injectable, NotFoundException } from '@nestjs/common';
import { Dish } from './Dish';
import { CreateDishDTO } from './dto/create-dish.dto';
import { UpdateDishDTO } from './dto/update-dish.dto';
import { ProductService } from 'src/recipe/products/product.service';

@Injectable()
export class DishService {
  private trackId = 1;
  private dishes: Dish[] = [
    {
      id: this.trackId++,
      name: 'Pizza',
      description: 'A delicious pizza',
      servings: 4,
      products: [],
    },
  ];

  constructor(private readonly productService: ProductService) {}

  create(dish: CreateDishDTO) {
    const newDish: Dish = {
      id: this.trackId++,
      products: [],
      ...dish,
    };

    this.dishes.push(newDish);
    return newDish;
  }

  getAll(): readonly Dish[] {
    return this.dishes;
  }

  getOneById(id: number) {
    const dish = this.dishes.find((d) => d.id === id);

    if (!dish) {
      throw new NotFoundException(`Dish id: ${id} not found`);
    }
    dish.products = this.productService.getAllForDishId(id);

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
