import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateBrandDto } from './dto/create.brand.dto';

@Injectable()
export class BrandService {
    constructor(private readonly prisma:PrismaService) { }

    async createBrand(data: CreateBrandDto) {
        return this.prisma.brand.create({
            data:{
                name: data?.name ?? '',
                slug: data?.slug ?? '',
                description: data?.description ?? '',
                logoUrl: data?.logoUrl ?? '',
                isActive: data?.isActive ?? false
            }
         });
    }
}
