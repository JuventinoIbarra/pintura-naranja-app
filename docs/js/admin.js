const API = "http://localhost:3000/api";
const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user"));

if (!user || user.role !=="admin"){
    window.location.href = "login.html"
}

async function loadProducts(){
    const res = await fetch(`${API}/products`);
    const products = await res.json();

    const container = document.getElementById("products");
    container.innerHTML = "";

    products.forEach(p => {
        container.innerHTML += `
        <div class="card">
        <h3>${p.name}</h3>
        <p> Stock actual: ${p.stock}</p>
        <input type="number" id="stock-${p._id}" placeholder="Nuevo Stock">
        <button onclick="updateStock('${p._id}')">Actualizar</button>
        </div>
        `
    })
}

async  function updateStock(id){
    const newStock = document.getElementById(`stock-${p._id}`).value;

    await fetch(`${API}/products/:id/stock`, {
        method: "PUT",
        headers:{
            "Content-type": "application/json",
            "Authorization": token
        },
        body:JSON.stringify({stock: newStock})
    });

    loadProducts();
}

async function loadOrders() {
    const orders = await apiFetch("/orders");
    const container = document.getElementById("orders");
    container.innerHTML = "";

    orders.forEach(o => {
        const productsHTML = o.products.map(item =>{
            return `
            <li>
            ${item.product?.name || "Producto eliminado"}
            - Cantidad: ${item.quantity}
            - Precio: ${item.product?.price || 0}
            </li>`;
        }).join("");

        container.innerHTML += `
        <div class="card">
        <h3>Pedido</h3>
        <p><strong>Cliente:</strong> ${o.user?.nombre || "Sin nombre"} (${o.user?.email || ""})</p>
        <ul>
            ${productsHTML}
        </ul>
        <p><strong>Total:</strong> $${o.total}</p>
        <p><strong>Estado:</strong> ${o.status}</p>

        <select id="status-${o._id}">
            <option value="pendiente">pendiente</option>
            <option value="pagado">pagado</option>
            <option value="enviado">enviado</option>
            <option value="entregado">entregado</option>
            <option value="cancelado">cancelado</option>
        </select>

        <button onclick="updateStatus('${o._id}')">
            Cambiar Estado
        </button>
        </div>
    `;
    });
}

async function updateStatus(id) {
    const newStatus = document.getElementById(`status-${id}`).value;

    await fetch(`${API}/orders/${id}/status`, {
        method: "PUT",
        headers: {
        "Content-Type": "application/json",
        "Authorization": token
        },
        body: JSON.stringify({ status: newStatus })
    });

    loadOrders();
}


loadProducts();
loadOrders();