/*
Repaso síncrono vs asíncrono
*/

const proceso1 = () => console.log('Proceso 1');
const proceso2 = () => console.log('Proceso 2');
const proceso3 = () => console.log('Proceso 3');

const proceso4 = () => {
    setTimeout(() => {
        console.log('Proceso 4');
    }, 3000); // 3000 = ms = milisegundos
}

// En proceso4 simulamos una secuencia asíncrona a través de setTimeout, que ejecuta
// un paquete de instrucciones transcurrido cierto tiempo (3 segs en este caso)
// Independientemente del orden en el cual llamemos a proceso4() debajo, siempre
// aparecerán primero las salidas del 1, 2 y 3, luego la del proceso asincrónico que
// toma más tiempo.
proceso1();
proceso4();
proceso2();
proceso3();
