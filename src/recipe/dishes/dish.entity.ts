import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Ingredient } from '../ingredients/ingredient.entity';
import { User } from 'src/user/user.entity';

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

  @ManyToOne(() => User, (user) => user.dishes)
  user: User;
}
