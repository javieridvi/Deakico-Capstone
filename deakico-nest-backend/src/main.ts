import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as fs from 'fs';
import morgan from 'morgan';

const logStream = fs.createWriteStream('api.log', 
  {flags: 'a', //append
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  //app.setGlobalPrefix('api')  //to change global prefix to an arbitrary one
  app.use(morgan('combined', {stream: logStream}));
  await app.listen(3000);
}
bootstrap();
