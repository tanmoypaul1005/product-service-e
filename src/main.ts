import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Socket } from 'node:net';
import { AppModule } from './app.module';

async function canReachRabbitMq(rabbitMqUrl: string): Promise<boolean> {
  try {
    const parsedUrl = new URL(rabbitMqUrl);
    const port = Number(parsedUrl.port || 5672);

    return await new Promise((resolve) => {
      const socket = new Socket();

      const cleanup = () => {
        socket.removeAllListeners();
        socket.destroy();
      };

      socket.setTimeout(1200);
      socket.once('connect', () => {
        cleanup();
        resolve(true);
      });
      socket.once('error', () => {
        cleanup();
        resolve(false);
      });
      socket.once('timeout', () => {
        cleanup();
        resolve(false);
      });

      socket.connect(port, parsedUrl.hostname);
    });
  } catch {
    return false;
  }
}

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);
  const rabbitMqUrl = process.env.RABBITMQ_URL ?? 'amqp://localhost:5672';
  const queue = process.env.RABBITMQ_QUEUE ?? 'product_queue';
  const rabbitMqEnabled = process.env.RABBITMQ_ENABLED === 'true';

  if (rabbitMqEnabled) {
    const rabbitMqReachable = await canReachRabbitMq(rabbitMqUrl);

    if (!rabbitMqReachable) {
      logger.warn(
        `RabbitMQ is not reachable at ${rabbitMqUrl}. Skipping RMQ microservice startup.`,
      );
    } else {
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
  }

  await app.listen(process.env.PORT ?? 3002);
}
bootstrap();
