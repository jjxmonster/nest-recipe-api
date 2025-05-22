import { Product, ProductUnit } from 'src/recipe/products/product.entity';
import { faker } from '@faker-js/faker';
import { DataSource } from 'typeorm';

export default class ProductFactory {
  constructor(private dataSource: DataSource) {}

  make(): Product {
    const product = new Product();
    const units: ProductUnit[] = ['kg', 'g', 'tsp', 'sp', 'pinch', 'ml', 'l'];

    product.name = faker.commerce.productName();
    product.unit = faker.helpers.arrayElement(units);

    return product;
  }

  makeMany(count: number): Product[] {
    return Array.from({ length: count }, () => this.make());
  }

  async create(): Promise<Product> {
    const product = this.make();
    return (await this.dataSource
      .getRepository('Product')
      .save(product)) as Product;
  }

  async createMany(count: number): Promise<Product[]> {
    const products = this.makeMany(count);
    return (await this.dataSource
      .getRepository('Product')
      .save(products)) as Product[];
  }
}
