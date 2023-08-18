<p align="center"><a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a></p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

<p align="center">Introducción a NestJS. Framework progresivo para desarrollo de aplicaciones backend con Node y Express.</p>
    

## Instalación herramienta CLI

```bash
$ npm i -g @nestjs/cli
```


## Creación de nuevo proyecto

```bash
$ nest new nombre_proyecto
```


## Corriendo la app

```bash
# desarrollo modo watch
$ npm run start:dev

# producción
$ npm run start:prod
```

## Versión de producción

```bash
# Se generará un directorio dist con una versión distribuible
$ npm run build
```


## Creando un módulo

<p>Nest opera bajo el concepto de módulos para organizar los diferentes componentes de la aplicación.
Por defecto nos presenta un módulo base app con un único endpoint habilitado en su servicio.</p>

<p>Podemos crear un nuevo módulo llamado Users con:</p>

```bash
# Elegir en este caso como tipo, REST API
# Optarpor que nos cree endpoints de ejemplo CRUD si lo deseamos.
# La misma herramienta creará también algunos archivos de testing para ahorrarnos trabajo
$ nest g resource Users
```


## Herramientas habilitadas

<p>Nest preconfigura por nosotros herramientas populares, listas para utilizar en el proyecto:</p>

- [Typescript](https://www.typescriptlang.org/): superset de JS para manejo de tipos. MUY IMPORTANTE! que comiences de a poco a familiarizarte.
- [ESLint](https://eslint.org/): analizador de código, control reglas escritura.
- [Prettier](https://prettier.io/): reglas de estilo y formateo de código.


## Comentarios sobre lo visto en clase

- main.ts: script principal de inicio: no modificamos nada por el momento.
- app.controller, module y service: respetando la estructura de capas, se separan las responsabilidades en estos archivos.
- app.module: integra los módulos iniciales necesarios. A medida que vayamos creando nuevos, Nest agregará los imports necesarios.
- app.controller: habilitamos los endpoints deseados. En nuestra caso solo hemos dejado el original, y creado un módulo nuevo Users para probar endpoints allí.
- app.services: la clase de servicios que ejecuta la lógica definitiva para procesar los datos y retorna los resultados al controlador.

- módulo Users: misma estructura descripta, ver comentarios en users.controller, users.service y DTO.

- Entities (user.entity.ts): otro concepto  importante que se incorpora, la definición de entidades para declarar correctamente la estructura de datos utilizada por el módulo. Es necesario para el manejo de tipos Typescript y se aprovecha para otras configuraciones como veremos más adelante.

- Decoradores: otro aspecto nuevo por aprender!. Cada vez que observes un nombre antecedido por @, estarás en presencia de un decorador. Se trata de una sintaxis / patrón alternativo con el cual podés agregar nuevas funcionalidades a un objeto sin modificar su bloque de código original. Nest utiliza mucho los decoradores, observá los comentarios en users.controller para más detalle.


## Ejecución de tests

```bash
# Unitarios
$ npm run test

# e2e
$ npm run test:e2e

# Coverage
$ npm run test:cov
```


## Licencia y Soporte

Nest es un proyecto abierto con licencia MIT. Si te interesa colaborar, podés leer más info en [este enlace](https://docs.nestjs.com/support).


## Contacto

- Autor - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Web oficial - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)