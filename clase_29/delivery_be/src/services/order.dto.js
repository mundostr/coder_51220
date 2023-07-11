/**
 * Recordemos que un DTO (Data Transfer Object) es un objeto intermedio que nos permite
 * garantizar un contenido normalizado para ser cargado en el DAO.
 * 
 * Generamos una clase que solo contiene un constructor, al momento de cargar un dato registro
 * (orden), se creará una instancia de este DTO para garantizar que el formato
 * de los datos sea correcto, recién allí se pasará al servicio DAO que maneja la carga (createOrder)
 * 
 * Podemos aprovechar también para agregar datos complementarios automáticos, como el número
 * de orden en este caso (ver esquema de campos en order.dbmodel.js)
 */

export default class OrderDTO {
    constructor(data) {
        this.number = Date.now() + Math.floor(Math.random() * 10000 + 1);
        this.business = data.business
        this.user = data.user
        this.products = data.actualOrder.map(product => product.id)
        this.totalPrice = data.actualOrder.reduce((acc, prev) => {
            acc += prev.price
            return acc;
        }, 0);
        this.completed = false
    }
}