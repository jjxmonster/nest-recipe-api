import { IsNumber, IsString, IsOptional } from 'class-validator';

export class UpdateDishDTO {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsNumber()
  servings: number;

  @IsOptional()
  @IsString()
  description?: string;
}
