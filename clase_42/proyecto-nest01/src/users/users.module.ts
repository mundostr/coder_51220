import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'

import { UsersService } from './users.service';
import { UsersController } from './users.controller';

import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/users.schema';

@Module({
  // Importamos el esquema para poder utilizarlo en el módulo de users
  imports: [MongooseModule.forFeature([
    {
      name: User.name,
      schema: UserSchema
    }
  ]), ConfigModule],
  controllers: [UsersController],
  providers: [UsersService],
})

export class UsersModule {}