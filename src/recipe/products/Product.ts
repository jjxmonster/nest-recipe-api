import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  unit: ProductUnit;

  @Column({ type: 'decimal' })
  amount: number;

  @Column({ type: 'int' }) // TODO: change to ForeignKey
  dishId: number;
}

export type ProductUnit = 'kg' | 'g' | 'tsp' | 'sp' | 'pinch' | 'ml' | 'l';
