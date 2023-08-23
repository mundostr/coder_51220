import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UsersDocument } from './schema/users.schema';

@Injectable()
export class UsersService {
  // Para este primer acercamiento a Nest, volvemos a utilizar una bbdd temporal en memoria,
  // que luego reemplazaremos por una colección MongoDB
  private users = [
    { id: 1, first_name: "Carlos", last_name: "Perren 1", email: "idux.net@gmail.com", password: "abc123" },
    { id: 2, first_name: "Carlos", last_name: "Perren 2", email: "idux.net@gmail.com", password: "abc123" },
    { id: 3, first_name: "Carlos", last_name: "Perren 3", email: "idux.net@gmail.com", password: "abc123" }
  ];

  // Inyectamos el modelo de usuario en el constructor para poder llamar a sus métodos
  // desde cualquiera de los métodos internos de la clase UsersService
  constructor(@InjectModel(User.name) private usersModel: Model <UsersDocument>) {}

  // Podemos ver que en la clase de servicio declaramos los distintos métodos que ejecutan
  // las operaciones solicitadas por el controller.
  // Como es habitual, si necesitamos cambiar la lógica de persistencia, no necesitamos tocar
  // otras áreas de la aplicación, solo la implementación de los métodos aquí.
  create(createUserDto: CreateUserDto) {
    // Ver archivos DTO para más detalles, aquí recibimos un objeto createUserDto sanitizado
    console.log(createUserDto)
    return 'This action adds a new user';
  }

  // Notar la indicación de tipos de Typescript
  // findAll acepta dos parámetros (offset y limit, de tipo numérico)
  // Si no recibe alguno, toma el valor predeterminado (0 y 50)
  
  // MUY IMPORTANTE!: recordar activar solicitudes asíncronas para procesar correctamente
  async findAll(offset: number = 0, limit: number = 50) {
    // Aquí estamos simplemente utilizando los métodos originales de Mongoose
    // para recuperar una parte de los registros (skip y  limit)
    // pero obviamente podríamos utilizar el módulo Mongoose Paginate V2
    return await this.usersModel.find().skip(offset).limit(limit);
  }

  findOne(id: number) {
    return this.users.find(user => user.id === id)
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const user = this.users.find(user => user.id === id)
    const newUser = Object.assign(user, updateUserDto)
    const newUsersArray = this.users.map((item) => (item.id === id ? newUser : item))
    this.users = [...newUsersArray]

    return newUser
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
