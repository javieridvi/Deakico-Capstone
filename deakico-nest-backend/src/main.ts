import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //app.setGlobalPrefix('api')  //to change global prefix to an arbitrary one
  await app.listen(3000);
}
bootstrap();
