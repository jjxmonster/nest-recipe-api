import { Product } from 'src/recipe/products/Product';

export interface Dish {
  id: number;
  name: string;
  description?: string;
  servings: number;
  products: Product[];
}
