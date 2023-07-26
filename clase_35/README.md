## Clase 35

### Uso de workers: ver ejemplo integrado y comentado en clase_34/artillery

### Primeros pasos con Docker:
    * Generamos el proyecto que deseamos encapsular en la imagen de Docker (en este caso utilizamos también el ejemplo en clase_34/artillery).

    * En el raíz de ese proyecto, creamos un Dockerfile con la lista de comandos que debe ejecutar Docker al crear la imagen (ver Dockerfile en clase_34/artillery)

    * Estando en el mismo directorio raíz, creamos la imagen mediante: docker build -t nombre_imagen . (observar el espacio y punto al final)

    * Contando con la imagen, podemos generar las instancias (contenedores) que necesitemos. Para ello ejecutamos: docker run -d -p puerto_interno:puerto_externo --name nombre_container nombre_imagen.

    * Ejemplo: docker run -d -p 3000:3000 --name artillery_container_1 docker_coderhouse
    