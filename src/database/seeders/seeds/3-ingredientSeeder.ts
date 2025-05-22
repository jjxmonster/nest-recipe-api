import { Seeder } from '@jorgebodega/typeorm-seeding';
import { DataSource } from 'typeorm';
import IngredientFactory from '../factories/ingredient.factory';
import { Product } from 'src/recipe/products/product.entity';
import { Dish } from 'src/recipe/dishes/dish.entity';
import { faker } from '@faker-js/faker';

export default class IngredientSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const ingredientFactory = new IngredientFactory(dataSource);

    // Pobierz wszystkie produkty i dania
    const products = (await dataSource
      .getRepository('Product')
      .find()) as Product[];
    const dishes = (await dataSource.getRepository('Dish').find()) as Dish[];

    if (products.length === 0 || dishes.length === 0) {
      console.log(
        '❌ No products or dishes found. Please run ProductSeeder and DishSeeder first.',
      );
      return;
    }

    console.log(
      `📦 Found ${products.length} products and ${dishes.length} dishes`,
    );

    let ingredientsCreated = 0;

    // Dla każdego dania dodaj 3-6 składników
    for (const dish of dishes) {
      const ingredientCount = faker.number.int({ min: 3, max: 6 });
      const usedProducts = new Set<number>();

      for (let i = 0; i < ingredientCount; i++) {
        // Wybierz losowy produkt (nie powtarzając w ramach tego samego dania)
        let product: Product;
        let attempts = 0;
        do {
          product = faker.helpers.arrayElement(products);
          attempts++;
        } while (usedProducts.has(product.id) && attempts < 10);

        if (attempts >= 10) break; // Zabezpieczenie przed nieskończoną pętlą

        usedProducts.add(product.id);

        await ingredientFactory.create({ product, dish });
        ingredientsCreated++;
      }
    }

    console.log(
      `Ingredient seeder completed - created ${ingredientsCreated} ingredients`,
    );
  }
}
