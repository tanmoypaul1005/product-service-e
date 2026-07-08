import { Controller } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices';

@Controller('category')

export class CategoryController {

    constructor(private readonly categoryService: CategoryService) { }

    @MessagePattern('category.getAllCategories')
    async getAllCategories(@Ctx() context: RmqContext) {
        const categories = await this.categoryService.getAllCategories();
        const channel = context.getChannelRef();
        const originalMessage = context.getMessage();
        channel.ack(originalMessage);
        return categories;
    }

    @MessagePattern('category.createCategory')
    async createCategory(data: { name: string }, @Ctx() context: RmqContext) {
        const category = await this.categoryService.createCategory(data);
        const channel = context.getChannelRef();
        const originalMessage = context.getMessage();
        channel.ack(originalMessage);
        return category;
    }
}
