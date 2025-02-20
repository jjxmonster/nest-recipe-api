import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { Product } from './Product';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  private trackId = 1;
  private products: Product[] = [];

  @Post()
  createOne(@Body() product: CreateProductDTO) {
    const newProduct: Product = {
      id: this.trackId++,
      ...product,
    };

    this.products.push(newProduct);
    return newProduct;
  }

  @Get()
  getP() {
    return this.products;
  }

  @Put()
  updateOne(@Body() product: UpdateProductDTO) {
    const productToUpdate = this.products.find((p) => p.id === product.id);

    if (!productToUpdate) {
      throw new NotFoundException(`Product id: ${product.id} not found`);
    }

    Object.assign(productToUpdate, product);
    return productToUpdate;
  }

  @Delete(':id')
  deleteOne(@Param('id', ParseIntPipe) id: number) {
    const productToDelete = this.products.find((p) => p.id === id);

    if (!productToDelete) {
      throw new NotFoundException(`Product id: ${id} not found`);
    }

    this.products = this.products.filter((p) => p.id !== id);
    return productToDelete;
  }
}
