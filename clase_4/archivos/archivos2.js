const fs = require('fs');

const archivo = './package.json';
const backup = './backup.json';

let info = {
    contenidoStr: '',
    contenidoObj: {},
    size: 0
}

const salvarBackup = async () => {
    await fs.promises.writeFile(backup, JSON.stringify(info.contenidoObj));
    console.log("Backup almacenado");
}

const recuperarJson = async () => {
    try {
        const contenido = await fs.promises.readFile(archivo, 'utf-8');
        info.contenidoStr = contenido; // asignación directa como string
        info.contenidoObj = JSON.parse(contenido); // conversión a objeto JSON
        info.size = contenido.length;

        // console.log(info);

        salvarBackup();
    }
    catch(err) {
        console.log(err);
    }
}


recuperarJson();