import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Inyectamos useGlobalPipes para activar la validación mediante las clases DTO
  // y habilitamos la transformación también, esto nos permite modificar sobre la
  // marcha los campos recibidos, por ejemplo pasar todo a mayúsculas o lo que se necesite
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  
  // Como tenemos inyectado ConfigModule.forRoot() en imports de app.module.ts,
  // podemos leer las variables de entorno directamente con process.env
  await app.listen(process.env.API_PORT || 3000);
}
bootstrap();
