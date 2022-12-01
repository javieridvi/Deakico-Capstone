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


// import { NestFactory } from '@nestjs/core';
// import serverlessExpress from '@vendia/serverless-express';
// import { Callback, Context, Handler } from 'aws-lambda';
// import { AppModule } from './app.module';

// let server: Handler;

// async function bootstrap(): Promise<Handler> {
//   const app = await NestFactory.create(AppModule);
//   await app.init();

//   const expressApp = app.getHttpAdapter().getInstance();
//   return serverlessExpress({ app: expressApp });
// }

// export const handler: Handler = async (
//   event: any,
//   context: Context,
//   callback: Callback,
// ) => {
//   server = server ?? (await bootstrap());
//   return server(event, context, callback);
// };