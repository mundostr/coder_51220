import { Router } from "express";

const pets = [
    { name: 'Melba', specie: 'Lebrel' },
    { name: 'Sansa', specie: 'Ratonero'},
    { name: 'Peluca', specie: 'Bichon' }
];

// Estas rutas corresponden simplemente al ejercicio de práctica de la clase, para refrescar conceptos
const petsRoutes = () => {
    const router = Router();

    router.get('/:pet', async (req, res) => {
        const pet = pets.find((pet) => { return pet.name === req.params.pet });

        if (pet) {
            res.status(200).send({ status: 'OK', msg: 'Mascota recuperada', data: pet });
        } else {
            res.status(200).send({ status: 'OK', msg: 'No existe mascota bajo ese nombre' });
        }
    });
    
    router.post('/', async (req, res) => {
        const { name, specie } = req.body; // desestructuramos el req.body
        if (!name || !specie) return res.status(400).send({ status: 'ERR', msg: 'Se requiere name y specie en el body' });

        const newPet = { name: name, specie: specie };
        pets.push(newPet);
        res.status(200).send({ status: 'OK', msg: 'Mascota agregada', data: newPet });
    });

    router.put('/:pet', async (req, res) => {
        const pet = pets.find((pet) => { return pet.name === req.params.pet });

        if (pet) {
            const petIndex = pets.indexOf(pet);
            pets[petIndex].adopted = true;
            res.status(200).send({ status: 'OK', msg: 'Mascota actualizada', data: pets[petIndex] });
        } else {
            res.status(200).send({ status: 'OK', msg: 'No se encuentra mascota bajo ese nombre para actualizar' });
        }
    });

    router.get('*', async (req, res) => {
        res.status(404).send({ status: 'ERROR', msg: 'No se puede procesar la solicitud de mascota' });
    });

    /* router.param('pet', async (req, res, next, code) => {
        const pet = pets.find((pet) => { return pet.name === req.params.pet });
        
        if (pet) {
            req.pet = pet;
        } else {
            req.pet = null;
        }

        next();
    }); */

    return router;
}

export default petsRoutes;