import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductsService } from '../products/products.service';
import { CreateOrderDto } from './dto/create-order.dto';

export interface Order {
  id: number;
  productId: number;
  quantity: number;
  totalPrice: number;
  createdAt: string;
}

@Injectable()
export class OrdersService {
  private orders: Order[] = [];
  private nextId = 1;

  constructor(private readonly productsService: ProductsService) {}

  placeOrder(createOrderDto: CreateOrderDto): Order {
    const { productId, quantity } = createOrderDto;

    const product = this.productsService.findOne(productId);

    if (product.stock < quantity) {
      throw new BadRequestException(
        `Insufficient stock for product "${product.name}" (available: ${product.stock})`,
      );
    }

    this.productsService.reduceStock(productId, quantity);

    const order: Order = {
      id: this.nextId++,
      productId,
      quantity,
      totalPrice: product.price * quantity,
      createdAt: new Date().toISOString(),
    };

    this.orders.push(order);

    return order;
  }
}
