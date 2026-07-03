import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async createProduct(createProductDto: CreateProductDto) {
    const { name, price, stock } = createProductDto;

    return this.prisma.product.create({
      data: {
        name,
        price: new Prisma.Decimal(price),
        stock,
      },
    });
  }

  async getAllProducts() {
    return this.prisma.product.findMany();
  }

  async getProductById(id: number) {
    return this.prisma.product.findUnique({
      where: { id },
    });
  }
}
