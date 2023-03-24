let lecturas = [ 21, 20, 21, 22, 24, 23, 24, 25, 22, 21, 20 ];

const LIMITE = 22;
let elem_excedidos = 0;
lecturas.map((item) => {
    if (item > LIMITE) {
        elem_excedidos = elem_excedidos + 1;
    }
});

console.log(`Elementos excedidos: ${elem_excedidos}`);