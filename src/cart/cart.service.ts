import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { AddToCartDto } from './dto/add-to-cart.dto';

@Injectable()
export class CartService {
    constructor(private readonly prisma:PrismaService) {}

    async addToCart(dto:AddToCartDto) {
        const existingCartItem = await this.prisma.cart.findFirst({
            where: {
                userId: dto.userId,
                productId: dto.productId,
            },
        });

        if (existingCartItem) {
            return this.prisma.cart.update({
                where: { id: existingCartItem.id },
                data: { quantity: existingCartItem.quantity + dto.quantity },
            });
        }

        return this.prisma.cart.create({
            data: {
                userId: dto.userId,
                productId: dto.productId,
                quantity: dto.quantity,
            },
        });
  }}
