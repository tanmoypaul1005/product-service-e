import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CategoryService {
    constructor(private readonly prisma: PrismaService) { }

    async getAllCategories() {
        return this.prisma.category.findMany({});
    }

    async createCategory(data: { name: string }) {
        return this.prisma.category.create({ data });
    }
}
