import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  async getStatus() {
    let database = 'disconnected';

    try {
      await this.prisma.$queryRaw`SELECT 1`;
      database = 'connected';
    } catch {
      database = 'disconnected';
    }

    return {
      service: 'product-service',
      status: 'ok',
      database,
      rabbitmqQueue: process.env.RABBITMQ_QUEUE ?? 'product_queue',
      timestamp: new Date().toISOString(),
    };
  }
}
