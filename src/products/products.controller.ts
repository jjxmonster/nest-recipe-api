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
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { ProductService } from './product.service';
import { DishService } from 'src/dishes/dish.service';

@Controller('products')
export class ProductsController {
  private productService = new ProductService();
  constructor(private readonly dishService: DishService) {}

  @Post()
  createOne(@Body() product: CreateProductDTO) {
    this.dishService.getOneById(product.dishId);
    return this.productService.create(product);
  }

  @Get()
  getAll() {
    return this.productService.getAll();
  }

  @Get(':id')
  getOneById(@Param('id', ParseIntPipe) id: number) {
    return this.productService.getOneById(id);
  }

  @Put()
  updateOne(@Body() product: UpdateProductDTO) {
    return this.productService.update(product);
  }

  @Delete(':id')
  deleteOne(@Param('id', ParseIntPipe) id: number) {
    return this.productService.delete(id);
  }
}
