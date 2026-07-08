import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';
import { CategoryModule } from './category/category.module';
import { BrandModule } from './brand/brand.module';

@Module({
  imports: [ProductModule, CartModule, CategoryModule, BrandModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
