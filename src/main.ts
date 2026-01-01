import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthMiddleWare } from './middleware/auth.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(AuthMiddleWare);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
