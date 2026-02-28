import { useEffect, useState } from "react";
import { apiFetch } from "../services/api";

function Admin(){
    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    const loadOrders = async () =>{
        try{
            const data = await apiFetch("/orders");
            setOrders(data.orders);
            setPage(data.page);
            setTotalPages(data.totalPages);
        }catch(error){
            console.error("Error cargando pedidos:", error);
        }
    };

    useEffect(() =>{
        loadOrders(page);
    }, [page]);

    const updateStatus = async (id, newStatus) => {
        try {
            await apiFetch(`/orders/${id}/status`, {
                method: "PATCH",
                body: JSON.stringify({status: newStatus})
            });

            loadOrders();
        }catch(error){
            console.error("Error actualizando estado:",error);
        }
    };
    return(
        <div style={{padding: "40px"}}>
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Panel Administrador</h2>

            {orders.map((o)=>(
                <div key={o._id} className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition mb-6">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="font-semibold text-gray-700">Cliente: {o.user?.nombre}</p>
                            <p className="text-sm text-gray-500">({o.user?.email})</p>
                        </div>
                        <div className="text-right">
                            <p className="text-lg text-orange-600">Total: {o.total}</p>
                        </div>
                    </div>

                    <p><strong>Estado: </strong>{o.status}</p>

                    <ul className="mt-4 space-y-2">
                        {o.products.map((item, index) =>(
                            <li key={index} className="text-sm text-gray-700">
                                {item.product?.name} - Cantidad: {item.quantity}
                            </li>
                        ))}
                    </ul>

                    <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                        o.status === "pendiente"
                        ? "bg-yellow-100 text-blue-700"
                        : o.status === "pagado"
                        ? "bg-red-100 text-blue-700"
                        : o.status === "enviado"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-green-100 text-green-700"
                        }`}>
                        {o.status}
                    </span>
                    
                    <select
                    className="mt-5 border rounded-lg p-2 focus:ring-orange-400 outline-none" 
                    value={o.status}
                    onChange={(e)=> updateStatus(o._id, e.target.value)}>
                        <option value="pendiente">pendiente</option>
                        <option value="pagado">pagado</option>
                        <option value="enviado">enviado</option>
                        <option value="entregado">entregado</option>
                        <option value="cancelado">cancelado</option>
                    </select>
                </div>
            ))}
            
            
            <div className="flex justify-center items-center gap-4 mt-8">
                <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50">
                    Anterior
                </button>

                <span className="text-gray-700 font-medium">
                    Pagina {page} de {totalPages}
                </span>

                <button
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50">
                    Siguiente
                </button>

            </div>
        </div>

    )
    
}

export default Admin;