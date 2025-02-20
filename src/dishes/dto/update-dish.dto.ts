import { IsNumber, IsString, IsOptional } from 'class-validator';

export class UpdateDishDTO {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsNumber(
    {},
    {
      message: 'Servings must be a number',
    },
  )
  servings: number;

  @IsOptional()
  @IsString()
  description?: string;
}
