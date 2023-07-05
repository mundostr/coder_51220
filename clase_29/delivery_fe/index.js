const API_ORDERS_URL = 'http://localhost:3000/api/orders';


const resolveOrder = async (id, completed, index) => {
    // const domOrdersList = document.getElementById('orders');
    // const node = domOrdersList.childNodes[index];
    // node.style.backgroundColor = completed ? 'lightgreen': '#f90';
    const response = await fetch(`${API_ORDERS_URL}/${id}?completed=${completed}`, { method: 'PUT' });
    const jsonResponse = await response.json();
    console.log(jsonResponse);    
    getOrders();
}

const getOrders = async () => {
    // Generamos referencia al elemento del DOM (en este caso ese elemento debe tener el id="orders");
    const domOrdersList = document.getElementById('orders');
    // Quitamos elementos internos actuales de la lista
    while (domOrdersList.firstChild) { domOrdersList.removeChild(domOrdersList.firstChild); }
    
    try {
        // Recuperamos la lista de órdenes desde la API
        const response = await fetch(API_ORDERS_URL);
        const jsonResponse = await response.json();
        const orders = jsonResponse.result;
        console.log(orders);

        // Ordenamos por el campo completed para que las pendientes queden siempre arriba
        orders.sort((a, b) => a.completed - b.completed);
    
        // Recorremos la lista
        orders.forEach((order, index) => {
            // Generamos un nuevo elemento interno
            const li = document.createElement('li');
            
            // Asignamos estilos y contenido
            li.classList.add('list-group-item');
            li.textContent = `${order.number} ($ ${order.totalPrice}) ${order.completed ? 'delivered': 'pending'}`;
            li.style.backgroundColor = order.completed ? 'lightgreen': '#f90';
            
            // Quitamos cualquier evento click previo y activamos nuevo
            li.removeEventListener('click', () => resolveOrder(order._id, !order.completed, index), false);
            li.addEventListener('click', () => resolveOrder(order._id, !order.completed, index));
            
            // Agregamos finalmente el elemento a la lista
            domOrdersList.appendChild(li);
        });
    } catch(err) {
        switch (err.message) {
            case 'Failed to fetch':
                domOrdersList.innerHTML = `ERROR al conectar a ${API_ORDERS_URL}. Por favor verifique ruta y disponibilidad.`;
                domOrdersList.style.backgroundColor = '#fc0';
                break;
            
            default:
        }
    }
};

getOrders();