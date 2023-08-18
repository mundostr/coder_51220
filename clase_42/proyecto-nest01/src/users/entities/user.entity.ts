enum roles {
    SUPERUSER = 'superuser',
    ADMIN = 'admin',
    USER = 'user'
}

// La estructura de datos utilizada por el módulo Users se define mediante una clase,
// especificando los tipos de datos.
// Podemos declarar nuestros propios tipos de datos compuestos o enumerables como el ejemplo de role
export class User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    // Si deseamos indicar un dato como optativo,
    // (al utilizar luego la definición en una carga de nuevo usuario por ejemplo)
    // empleamos el signo de pregunta ?
    avatar: string; // avatar?: string;
    role: roles;
}