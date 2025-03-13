import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { Ingredient } from '../ingredients/ingredient.entity';

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  unit: ProductUnit;

  @OneToMany(() => Ingredient, (ingredient) => ingredient.product, {
    onDelete: 'CASCADE',
  })
  ingredients: Ingredient[];
}

export type ProductUnit = 'kg' | 'g' | 'tsp' | 'sp' | 'pinch' | 'ml' | 'l';
