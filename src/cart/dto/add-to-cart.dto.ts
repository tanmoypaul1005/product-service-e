import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive } from 'class-validator';

export class AddToCartDto {
  @ApiProperty({ description: 'Product ID to add to cart', example: 1 })
  @IsInt()
  @IsPositive()
  productId: number;
}