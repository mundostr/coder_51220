RECORDÁ COLOCAR TU URL DE MONGO ATLAS ANTES DE EJECUTAR ESTE PROYECTO
Y TENER INSTALADO ARTILLERY COMO HERRAMIENTA GENERAL

npm i -g artillery

El comando es: artillery run config.yml -o test.json

Para graficar los resultados: artillery report test.json -o test.html

Éste tomará el json correspondiente y procederá a generar un html para leer las estadísticas de manera más amigable.

El proyecto cuenta con artillery -D, además. para poder ejecutar el testing por endpoint, se utiliza el plugin:

artillery-plugin-metrics-by-endpoint

(Revisar package.json para ver lo que se está utilizando).