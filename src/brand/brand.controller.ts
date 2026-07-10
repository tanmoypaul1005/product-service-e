import { Body, Controller } from '@nestjs/common';
import { BrandService } from './brand.service';
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices';
import { CreateBrandDto } from './dto/create.brand.dto';

@Controller('brand')
export class BrandController {
    
    constructor(private readonly brandService: BrandService) { }

    @MessagePattern('brand.createBrand')
    async createBrand(@Body() data: CreateBrandDto, @Ctx() context: RmqContext) {
        const brand = await this.brandService.createBrand(data);

        const channel = context.getChannelRef();
        const originalMessage = context.getMessage();
        channel.ack(originalMessage);
        return brand;
    }
}
