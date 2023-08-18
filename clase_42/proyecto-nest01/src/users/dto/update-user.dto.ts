// Nest nos crea por defecto un DTO tanto para carga como para modificación de datos
// Podremos colocar aquí validaciones y ajustes de normalización que querramos realizar

import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
