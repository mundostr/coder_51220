import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  // Para este primer acercamiento a Nest, volvemos a utilizar una bbdd temporal en memoria,
  // que luego reemplazaremos por una colección MongoDB
  private users = [
    { id: 1, first_name: "Carlos", last_name: "Perren 1", email: "idux.net@gmail.com", password: "abc123" },
    { id: 2, first_name: "Carlos", last_name: "Perren 2", email: "idux.net@gmail.com", password: "abc123" },
    { id: 3, first_name: "Carlos", last_name: "Perren 3", email: "idux.net@gmail.com", password: "abc123" }
  ];

  // Podemos ver que en la clase de servicio declaramos los distintos métodos que ejecutan
  // las operaciones solicitadas por el controller.
  // Como es habitual, si necesitamos cambiar la lógica de persistencia, no necesitamos tocar
  // otras áreas de la aplicación, solo la implementación de los métodos aquí.
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  // Notar la indicación de tipos de Typescript
  // findAll acepta un parámetro llamado limit, de tipo numérico
  // Si no lo recibe, el valor predeterminado es 5
  findAll(limit: number = 5): string {
    return `This action returns ${limit} users`;
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
