import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

// Nest utiliza mucho los decoradores
// @Controller marca una clase (UsersController) como controlador Nest,
// el cual en este caso será accesible mediante el prefijo /users
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  
  // Podemos ver que cada endpoint se define también mediante decoradores
  // En este caso un endpoint que acepta solicitudes GET al raíz
  // (por ejemplo http://localhost:puerto/users)
  
  // Vemos que los elementos habituales de la request Express, también se extraen utilizando decoradores
  // @Param (req.params), @Body (req.body), @Query (req.query)
  // En este caso el formato de url sería http://localhost:puerto/users?limit=10
  
  // MUY IMPORTANTE!: recordar activar solicitudes asíncronas para procesar correctamente
  @Get()
  async findAll(@Query('offset') offset: number, @Query('limit') limit: number) {
    const users = await this.usersService.findAll(offset, limit);
    return { status: 'OK', data: users };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    if (isNaN(+id)) throw new HttpException('Parámetro no válido', HttpStatus.BAD_REQUEST);
    // Como id se recibe como string, Typescript nos permite anteceder el signo + para
    // realizar la conversión a número, que es el tipo de parámetro aceptado por findOne
    return this.usersService.findOne(+id);
  }
  
  @Post()
  // Activamos el uso de la clase DTO para creación (CreateUserDto), que por ahora continúa vacía
  // El objeto createUserDto recibirá el contenido del req.body
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Patch(':id')
  // Activamos el uso de la clase DTO para actualización (UpdateUserDto)
  // que por ahora continúa vacía
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}