import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.interface';

@Injectable()
export class ProductsService {
  private readonly products: Product[] = [
    {
      id: 1,
      name: 'Wireless Mouse',
      description: 'A basic wireless mouse with USB receiver',
      price: 599,
      stock: 20,
    },
    {
      id: 2,
      name: 'Mechanical Keyboard',
      description: 'A compact mechanical keyboard with blue switches',
      price: 2999,
      stock: 15,
    },
    {
      id: 3,
      name: 'USB-C Charging Cable',
      description: 'A 1-meter fast charging USB-C cable',
      price: 349,
      stock: 50,
    },
    {
      id: 4,
      name: 'Laptop Stand',
      description: 'An adjustable aluminum laptop stand',
      price: 1299,
      stock: 10,
    },
    {
      id: 5,
      name: 'Bluetooth Headphones',
      description: 'Over-ear Bluetooth headphones with 20-hour battery life',
      price: 1999,
      stock: 12,
    },
    {
      id: 6,
      name: 'HD Webcam',
      description: '1080p webcam with built-in microphone',
      price: 1499,
      stock: 8,
    },
  ];

  findAll(): Product[] {
    return this.products;
  }

  findOne(id: number): Product {
    const product = this.products.find((product) => product.id === id);

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return product;
  }

  reduceStock(id: number, quantity: number): void {
    const product = this.findOne(id);
    product.stock -= quantity;
  }
}
