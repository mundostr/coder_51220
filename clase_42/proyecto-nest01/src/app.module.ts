import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

import showRouteInfo from './middleware/showRouteInfo';

@Module({
  // imports: [UsersModule, MongooseModule.forRoot('mongodb://localhost:27017/coder51220')],
  // Conectamos al motor bbdd de forma asíncrona mediante el módulo de Mongoose propio de Nest
  imports: [UsersModule, ConfigModule.forRoot(), MongooseModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async(config: ConfigService) => ({
      // Podemos utilizar process.env directamente, si bien config.get en este caso se considera
      // mejor práctica por el casting, la validación y otros detalles, pero ambos funcionan
      uri: process.env.MONGO_URI || 'mongodb://localhost:27017/coder51220_alt'
      // uri: config.get<string>('MONGO_URI') || 'mongodb://localhost:27017/coder51220_alt'
    })
  })],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements NestModule {
  // Inyectamos mediante un consumidor el middleware showRouteInfo, indicando que se
  // ejecutará oara cualquier ruta y cualquier método
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(showRouteInfo).forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}