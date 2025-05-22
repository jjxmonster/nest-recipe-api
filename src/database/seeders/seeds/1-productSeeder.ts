import { Seeder } from '@jorgebodega/typeorm-seeding';
import { DataSource } from 'typeorm';
import ProductFactory from '../factories/product.factory';

export default class ProductSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const productFactory = new ProductFactory(dataSource);
    await productFactory.createMany(20);
    console.log('Product seeder completed - created 20 products');
  }
}
