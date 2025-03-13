import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.entity';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(product: CreateProductDTO): Promise<Product> {
    const newProduct = this.productRepository.create(product);
    return this.productRepository.save(newProduct);
  }

  getAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  // getAllForDishId(dishId: number): Promise<Product[]> {
  //   return Product.findBy({ dishId });
  // }

  async getOneById(id: number): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id });

    if (!product) {
      throw new NotFoundException(`Product id: ${id} not found`);
    }

    return product;
  }

  async update(product: UpdateProductDTO) {
    await this.getOneById(product.id);
    return this.productRepository.update(product.id, product);
  }

  async delete(id: number): Promise<Product> {
    const productToDelete = await this.getOneById(id);
    return this.productRepository.remove(productToDelete);
  }
}
