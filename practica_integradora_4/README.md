## PRACTICA INTEGRADORA 4

### En este ejercicio nos enfocamos en:

1. Agregar soporte para logging (Winston).
2. Agregar soporte para documentación (Swagger).
3. Agregar pruebas unitarias y alguna de integración.
4. Agregar alternativa para subida de archivos (Multer / express-fileupload).
5. Agregar validación de body (express-validator).


### Dependencias
```bash
$ express-fileupload express-validator swagger-jsdoc swagger-ui-express winston
$ npm i chai mocha supertest --save-dev
```


### Ejemplo variables de entorno development (archivo .env.development en raíz del proyecto)
```bash
SERVER_PORT=3000
MONGOOSE_URL="mongodb://127.0.0.1:27017/coder51220"
MYSQL_URL="mysql_server"
MYSQL_DB="mysql_database"
MYSQL_USER="mysql_user"
MYSQL_PASS="mysql_pass"
SECRET="abcdefgh12345678"
PERSISTENCE="mongo"
ALLOWED_ORIGINS="*"
UPLOAD_DIR="uploads"
DEFAULT_LOG_LEVEL="debug"
```


### Enlaces de referencia
- Logging: [Winston](https://github.com/winstonjs/winston)
- Documentación: [Swagger](https://swagger.io/docs/)
- Pruebas unitarias, aserciones: [Chai](https://www.chaijs.com/api/bdd/)
- Subida de archivos: [Multer](https://www.npmjs.com/package/multer)
- Subida de archivos: [Express File Upload](https://www.npmjs.com/package/express-fileupload)
- Validación: [Express Validator](https://www.npmjs.com/package/express-validator)