export interface Product {
  id: number;
  name: string;
  unit: ProductUnit;
  amount: number;
  dishId: number;
}

export type ProductUnit = 'kg' | 'g' | 'tsp' | 'sp' | 'pinch' | 'ml' | 'l';
