## Proyecto ADOPTME, adopción de mascotas
### Utilizamos este proyecto como práctica para generación de documentación API mediante Swagger

Instalación de Swagger:
- npm i swagger-jsdoc swagger-ui-express

Configuración inicial:
- ver comentarios en app.js

Configuración de rutas:
- creamos un directorio docs en src, junto con un subdirectorio y un archivo YAML dentro por cada paquete de rutas

Ejemplo:
- Si observamos el archivo de rutas de usuario (users.router.js), vemos que sirve 4 endpoints:
    - GET /
    - GET /:uid
    - PUT /:uid
    - DELETE /:uid
- Armaremos un archivo de configuración src/docs/Users/Users.yaml para que Swagger genere la documentación de estos endpoints (ver directamente comentarios orientativos en el archivo).

Prácticas adicionales:
- Sumar la documentación de Pets y de Adoptions tomando como base el archivo de config hecho para Users.
- Trasladar estos conceptos a la generación de documentación para el futuro proyecto final del curso.
