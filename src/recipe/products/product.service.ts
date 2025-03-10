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
  private trackId = 1;
  private products: Product[] = [];

  constructor(
    @Inject(forwardRef(() => DishService)) private dishService: DishService,
  ) {}

  create(product: CreateProductDTO) {
    const newProduct: Product = {
      id: this.trackId++,
      ...product,
    };
    this.dishService.getOneById(product.dishId);
    this.products.push(newProduct);
    return newProduct;
  }

  getAll(): readonly Product[] {
    return this.products;
  }

  getAllForDishId(dishId: number) {
    return this.products.filter((p) => p.dishId === dishId);
  }

  getOneById(id: number) {
    const product = this.products.find((p) => p.id === id);

    if (!product) {
      throw new NotFoundException(`Product id: ${id} not found`);
    }

    return product;
  }

  update(product: UpdateProductDTO) {
    const productToUpdate = this.getOneById(product.id);
    Object.assign(productToUpdate, product);
    return productToUpdate;
  }

  delete(id: number) {
    this.getOneById(id);
    this.products = this.products.filter((p) => p.id !== id);
    return { id };
  }
}
