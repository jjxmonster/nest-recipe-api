import { Injectable } from '@nestjs/common';
import { IngredientRepository } from './ingredient.repository';
import { Ingredient } from './ingredient.entity';

@Injectable()
export class IngredientService {
  constructor(private readonly ingredientRepository: IngredientRepository) {}

  async getOneById(id: number): Promise<Ingredient> {
    console.log('getOneById', id);
    return await this.ingredientRepository.findById(id);
  }
}
