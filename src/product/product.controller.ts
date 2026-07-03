import { Body, Controller, Post } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @MessagePattern('product.create')
  async createProductFromQueue(
    @Payload() createProductDto: CreateProductDto,
    @Ctx() context: RmqContext,
  ) {
    const product = await this.productService.createProduct(createProductDto);
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();

    channel.ack(originalMessage);

    return product;
  }
}
