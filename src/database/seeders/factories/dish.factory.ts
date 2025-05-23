import { Dish } from 'src/recipe/dishes/dish.entity';
import { faker } from '@faker-js/faker';
import { DataSource } from 'typeorm';

export default class DishFactory {
  constructor(private dataSource: DataSource) {}

  make(): Dish {
    const dish = new Dish();

    dish.name = faker.lorem.words(3);
    dish.description = faker.lorem.sentences(2);
    dish.servings = faker.number.int({ min: 1, max: 8 });

    return dish;
  }

  makeMany(count: number): Dish[] {
    return Array.from({ length: count }, () => this.make());
  }

  async create(): Promise<Dish> {
    const dish = this.make();
    return (await this.dataSource.getRepository('Dish').save(dish)) as Dish;
  }

  async createMany(count: number): Promise<Dish[]> {
    const dishes = this.makeMany(count);
    return (await this.dataSource.getRepository('Dish').save(dishes)) as Dish[];
  }
}
