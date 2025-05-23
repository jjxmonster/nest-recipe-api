import { Ingredient } from 'src/recipe/ingredients/ingredient.entity';
import { Product } from 'src/recipe/products/product.entity';
import { Dish } from 'src/recipe/dishes/dish.entity';
import { faker } from '@faker-js/faker';
import { DataSource } from 'typeorm';

export default class IngredientFactory {
  constructor(private dataSource: DataSource) {}

  make(options?: { product?: Product; dish?: Dish }): Ingredient {
    const ingredient = new Ingredient();

    ingredient.amount = faker.number.float({
      min: 0.1,
      max: 100,
      fractionDigits: 2,
    });

    if (options?.product) {
      ingredient.product = options.product;
    }

    if (options?.dish) {
      ingredient.dish = options.dish;
    }

    return ingredient;
  }

  makeMany(
    count: number,
    options?: { product?: Product; dish?: Dish },
  ): Ingredient[] {
    return Array.from({ length: count }, () => this.make(options));
  }

  async create(options?: {
    product?: Product;
    dish?: Dish;
  }): Promise<Ingredient> {
    const ingredient = this.make(options);
    return (await this.dataSource
      .getRepository('Ingredient')
      .save(ingredient)) as Ingredient;
  }

  async createMany(
    count: number,
    options?: { product?: Product; dish?: Dish },
  ): Promise<Ingredient[]> {
    const ingredients = this.makeMany(count, options);
    return (await this.dataSource
      .getRepository('Ingredient')
      .save(ingredients)) as Ingredient[];
  }

  async createWithRelations(
    dishId: number,
    productId: number,
  ): Promise<Ingredient> {
    const product = (await this.dataSource
      .getRepository('Product')
      .findOne({ where: { id: productId } })) as Product;
    const dish = (await this.dataSource
      .getRepository('Dish')
      .findOne({ where: { id: dishId } })) as Dish;

    if (!product || !dish) {
      throw new Error('Product or Dish not found');
    }

    return await this.create({ product, dish });
  }
}
