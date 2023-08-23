// Nest nos crea por defecto un DTO tanto para carga como para modificación de datos
// Podremos colocar aquí validaciones y ajustes de normalización que querramos realizar

// https://www.npmjs.com/package/class-validator
// https://www.npmjs.com/package/class-transformer
// https://www.devxperiences.com/pzwp1/2022/03/14/nestjs-rest-api-class-validator-class-transformer/
import { IsEmail, IsNotEmpty, Length } from 'class-validator'
import { Transform } from 'class-transformer'

// Nuevamente, utilizando sintaxis de decoradores, agregamos distintas
// validaciones a los campos que deseamos controlar al crear un nuevo usuario
// Cada campo puede tener múltiples validaciones precediendo los decoradores necesarios
// y también múltiples transformaciones
export class CreateUserDto {
    @IsNotEmpty({ message: 'El nombre es obligatorio' })
    first_name: string

    // En este ejemplo podemos ver que controlamos que last_name no esté vacío,
    // tenga entre 2 y 64 caracteres, y sea pasado a mayúsculas antes de ser
    // entregado al método create del servicio
    @IsNotEmpty({ message: 'El apellido es obligatorio' })
    @Length(2, 64, { message: 'El apellido debe tener entre 2 y 64 caracteres'})
    @Transform(param => param.value.toUpperCase())
    last_name: string

    @IsEmail({}, { message: 'El email no tiene formato válido' })
    @IsNotEmpty({ message: 'El mail es obligatorio' })
    email: string
    
    @IsNotEmpty({ message: 'La clave es obligatoria' })
    @Length(2, 8, { message: 'La clave debe tener entre 2 y 8 caracteres'})
    password: string;
}

