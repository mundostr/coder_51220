/*
Analizar este código y agendar:
Qué parámetros recibe?
Qué operaciones ejecuta?
Qué retorna?
Qué problemas nos surgen para interpretar y modificar?

Reajustar la rutina para permitir compras premium (mayor prioridad).
Las órdenes de venta deberán primero abastecer a las premium y luego cubrir las normales,
pero si una orden de compra tiene más de 2 semanas, se debe pasar como prioritaria.
*/


/**
 * This function allocates ordes by date
 *
 * @param {Array} salesOrders - Array of sales received.
 * @param {Array} purchaseOrders - Array of purchased made.
 * @returns {Array} allocatedOrders - Array of allocated orders.
 * @throws {Error} If one of the parameters is not an array.
 * @example
 * //
 */
export default allocate = (salesOrders, purchasesOrders) => {
    if (!Array.isArray(salesOrders) || !Array.isArray(purchasesOrders)) throw new Error('Invalid data types. Both parameters must be strings');
    const orderedSales = salesOrders.sort((a, b) => new Date(a.created) - new Date(b.created));
    const orderedPurchases = purchasesOrders.sort((a, b) => new Date(a.receiving) - new Date(b.receiving));
    const allocatedOrders = [];
    let totalQuantityInStock = 0;
    while (orderedSales.length > 0 && orderedPurchases.length > 0) {
        let currentPurchase = orderedPurchases.shift();
        totalQuantityInStock += currentPurchase.quantity;
        while (totalQuantityInStock >= orderedSales[0].quantity) {
            const salesOrder = orderedSales.shift();
            allocatedOrders.push({
                id: salesOrder.id,
                date: currentPurchase.receiving
            })
            totalQuantityInStock -= salesOrder.quantity;
            if (orderedSales.length === 0) break;
        }
    }
    return allocatedOrders;
}