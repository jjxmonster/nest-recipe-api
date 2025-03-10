import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { Product } from './Product';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { DishService } from 'src/recipe/dishes/dish.service';

@Injectable()
export class ProductService {
  constructor(
    @Inject(forwardRef(() => DishService)) private dishService: DishService,
  ) {}

  create(product: CreateProductDTO): Promise<Product> {
    const newProduct = new Product();
    Object.assign(newProduct, product);
    this.dishService.getOneById(product.dishId);
    return newProduct.save();
  }

  getAll(): Promise<Product[]> {
    return Product.find();
  }

  // getAllForDishId(dishId: number): Promise<Product[]> {
  //   return Product.findBy({ dishId });
  // }

  async getOneById(id: number): Promise<Product> {
    const product = await Product.findOneBy({ id });

    if (!product) {
      throw new NotFoundException(`Product id: ${id} not found`);
    }

    return product;
  }

  async update(product: UpdateProductDTO): Promise<Product> {
    const productToUpdate = await this.getOneById(product.id);
    Object.assign(productToUpdate, product);
    return productToUpdate.save();
  }

  async delete(id: number): Promise<Product> {
    const productToDelete = await this.getOneById(id);
    return productToDelete.remove();
  }
}
