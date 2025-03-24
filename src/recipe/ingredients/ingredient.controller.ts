import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { IngredientService } from './ingredient.service';

@Controller('ingredients')
export class IngredientController {
  constructor(private readonly ingredientService: IngredientService) {}

  @Get(':id')
  getOneById(@Param('id', ParseIntPipe) id: number) {
    return this.ingredientService.getOneById(id);
  }
}
