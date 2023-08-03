import fs from 'file-system';
import imageModel from "../models/image.model.js";

const uploadContent = async (req, res) => {
    // Si hay un file en el objeto request, quiere decir que se subió un archivo correctamente.
    // Se lo lee desde disco, se lo codifica como cadena base64 y se lo almacena en MongoDB.
    // Por supuesto podría borrarse luego el archivo de disco.
    if (req.file) {
        const file = fs.readFileSync(req.file.path);
        const encodedFile = file.toString('base64');
        const finalFile = {
            contentType: req.file.mimetype,
            image: Buffer.from(encodedFile, 'base64')
        };

        await imageModel.create(finalFile);

        res.status(200).send({ status: 'OK', data: { text: req.body, file: req.file.originalname } })
    } else {
        res.status(200).send({ status: 'OK', data: { text: req.body } })
    }
}

export default { uploadContent };