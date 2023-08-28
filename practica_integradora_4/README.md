## PRACTICA INTEGRADORA 3

### En este ejercicio nos enfocamos en:

1. Comprender el manejo de la arquitectura por capas.
2. Aislar la responsabilidad de las rutas.
3. Aislar la responsabilidad de los controladores.
4. Aislar la responsabilidad de los servicios.
5. Entender la responsabilidad de la persistencia.
6. Aplicar clases DAO para MongoDB y MySQL, junto a un objeto DTO.
7. Aplicar clases singleton para conexión a bbdd.
8. Aplicar patrón general Repository y ver la opción de Factory.
9. Utilizar variables de entorno y configuraciones de línea de comandos para cambiar entre DEVEL y PROD.
10. Aplicar autenticación de usuarios con passport local y autorización vía roles.
11. Activación de clase para manejo personalizado de errores, con diccionario.

### Módulos a instalar:
- bcrypt commander cors dotenv express express-handlebars express-session mongoose multer mysql2 passport passport-local.

### Otras integraciones para sumar:
- Sesiones en bbdd: connect-mongo.
- Trabajo con JWT: cookie-parser jsonwebtoken passport-jwt.
- Paginación resultados de Mongoose: mongoose-paginate-v2.

### Estructura de carpetas:
- auth.
- controllers.
- models.
- routes.
- services.
- utils.
- views.

### Archivos base:
- app.js (app principal).
- config.js (configuración variables de entorno y línea de comandos).
- .env.development (variables de entorno para desarrollo).
- .env.production (variables de entorno para producción).