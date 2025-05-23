import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { Ingredient } from '../ingredients/ingredient.entity';

@Entity()
export class Dish extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  description?: string;

  @Column({ type: 'decimal' })
  servings: number;

  @OneToMany(() => Ingredient, (ingredient) => ingredient.dish)
  ingredients: Ingredient[];
}
