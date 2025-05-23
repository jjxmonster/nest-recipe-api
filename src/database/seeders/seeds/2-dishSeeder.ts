import { Seeder } from '@jorgebodega/typeorm-seeding';
import { DataSource } from 'typeorm';
import DishFactory from '../factories/dish.factory';

export default class DishSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const dishFactory = new DishFactory(dataSource);
    await dishFactory.createMany(15);
    console.log('Dish seeder completed - created 15 dishes');
  }
}
