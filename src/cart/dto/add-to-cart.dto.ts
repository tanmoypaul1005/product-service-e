import { IsInt, IsPositive, IsOptional } from 'class-validator';

export class AddToCartDto {
  @IsInt()
  @IsPositive()
  productId: number;

  @IsInt()
  @IsPositive()
  userId: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  quantity?: number;
}