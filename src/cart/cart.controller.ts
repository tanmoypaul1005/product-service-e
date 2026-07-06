import { Controller } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @MessagePattern('cart.addToCart')
  async addToCart(@Payload() addToCartDto: AddToCartDto, @Ctx() context: RmqContext) {
    const cartItem = await this.cartService.addToCart(addToCartDto);
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    channel.ack(originalMessage);

    return cartItem;
  }

  @MessagePattern('cart.getCartItems')
  async getCartItems(@Payload() userId: string, @Ctx() context: RmqContext) {
    const cartItems = await this.cartService.getCartItems(userId);

    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    channel.ack(originalMessage);
    return cartItems;
  }

}
