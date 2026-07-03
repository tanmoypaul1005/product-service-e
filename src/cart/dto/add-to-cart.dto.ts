
import { IsInt, IsPositive } from 'class-validator';

export class AddToCartDto {

  @IsInt()
  @IsPositive()
  productId: number;


  @IsInt()
  @IsPositive()
  userId: number;  // <-- কোনো ? চিহ্ন থাকা যাবে না

  @IsInt()
  @IsPositive()
  quantity?: number;
}