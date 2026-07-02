import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const rabbitMqUrl = process.env.RABBITMQ_URL ?? 'amqp://localhost:5672';
  const queue = process.env.RABBITMQ_QUEUE ?? 'product_queue';
  const rabbitMqEnabled = process.env.RABBITMQ_ENABLED === 'true';

  if (rabbitMqEnabled) {
    app.connectMicroservice<MicroserviceOptions>({
      transport: Transport.RMQ,
      options: {
        urls: [rabbitMqUrl],
        queue,
        queueOptions: {
          durable: true,
        },
        noAck: false,
      },
    });

    await app.startAllMicroservices();
  }

  await app.listen(process.env.PORT ?? 3002);
}
bootstrap();
