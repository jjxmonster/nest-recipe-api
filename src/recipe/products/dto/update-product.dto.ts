import { IsNumber, IsString } from 'class-validator';
import { ProductUnit } from '../Product';

export class UpdateProductDTO {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsString()
  unit: ProductUnit;

  @IsNumber()
  amount: number;

  @IsNumber()
  dishId: number;
}
