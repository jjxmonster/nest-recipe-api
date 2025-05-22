import 'reflect-metadata';
import dataSource from '../src/config/database.config';
import UserSeeder from '../src/database/seeders/seeds/0-userSeeder';
import ProductSeeder from '../src/database/seeders/seeds/1-productSeeder';
import DishSeeder from '../src/database/seeders/seeds/2-dishSeeder';
import IngredientSeeder from '../src/database/seeders/seeds/3-ingredientSeeder';

async function runSeeders() {
  try {
    console.log('🌱 Starting seeders...');
    console.log('Initializing data source...');

    await dataSource.initialize();
    console.log('✅ Data source initialized successfully');

    console.log(
      'Available entities:',
      dataSource.entityMetadatas.map((meta) => meta.name),
    );

    console.log('🚀 Running all seeders...');

    console.log('1️⃣ Running UserSeeder...');
    const userSeeder = new UserSeeder();
    await userSeeder.run(dataSource);

    console.log('2️⃣ Running ProductSeeder...');
    const productSeeder = new ProductSeeder();
    await productSeeder.run(dataSource);

    console.log('3️⃣ Running DishSeeder...');
    const dishSeeder = new DishSeeder();
    await dishSeeder.run(dataSource);

    console.log('4️⃣ Running IngredientSeeder...');
    const ingredientSeeder = new IngredientSeeder();
    await ingredientSeeder.run(dataSource);

    console.log('🎉 All seeders completed successfully');
  } catch (error) {
    console.error('❌ Error running seeders:', error);
    process.exit(1);
  } finally {
    if (dataSource.isInitialized) {
      await dataSource.destroy();
      console.log('🔌 Data source connection closed');
    }
  }
}

runSeeders();
