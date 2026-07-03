import { Controller } from '@nestjs/common';
import { CartService } from './cart.service';

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

}
