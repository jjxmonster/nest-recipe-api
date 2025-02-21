import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateDishDTO } from './dto/create-dish.dto';
import { UpdateDishDTO } from './dto/update-dish.dto';
import { DishService } from './dish.service';

@Controller('dishes')
export class DishesController {
  private dishService: DishService;

  constructor(dishService: DishService) {
    this.dishService = dishService;
  }

  @Post()
  createOne(@Body() dish: CreateDishDTO) {
    return this.dishService.create(dish);
  }

  @Get()
  getDishes() {
    return this.dishService.getAll();
  }

  @Get(':id')
  getOneById(@Param('id', ParseIntPipe) id: number) {
    return this.dishService.getOneById(id);
  }

  @Put()
  updateOne(@Body() dish: UpdateDishDTO) {
    return this.dishService.update(dish);
  }

  @Delete(':id')
  deleteOne(@Param('id', ParseIntPipe) id: number) {
    return this.dishService.delete(id);
  }
}
