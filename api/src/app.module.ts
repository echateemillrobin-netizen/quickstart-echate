import { Module } from '@nestjs/common';
import { HealthController } from './health/health.controller';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [ProductsModule, OrdersModule],
  controllers: [HealthController],
})
export class AppModule {}
