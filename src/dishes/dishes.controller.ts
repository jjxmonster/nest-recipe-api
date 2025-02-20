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
  constructor(private readonly dishService: DishService) {}

  @Post()
  createOne(@Body() dish: CreateDishDTO) {
    return this.dishService.create(dish);
  }

  @Get()
  getDishes() {
    return this.dishService.findAll();
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
