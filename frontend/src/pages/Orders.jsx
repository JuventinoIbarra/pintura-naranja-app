import { useEffect, useState } from "react";
import { apiFetch } from "../services/api";

function Orders(){
    const [products, setProducts] = useState([]); 
    const [cart, setCart] = useState([]); 
    const [orders, setOrders] = useState([]);

    const [currency, setCurrency] = useState("MXN");
    const [convertedTotal, setConvertedTotal] = useState(null);
    const [rate, setRate] = useState(null);

    const total = cart.reduce((acc, item) =>{
        return acc + item.price * item.quantity;
    }, 0);

    const convertTotal = async () =>{
        try{
            if(currency === "MXN"){
                setConvertedTotal(null);
                setRate(null)
                return;
            }
            const data = await apiFetch(
                `/currency/convert?amount=${total}&from=MXN&to=${currency}`
            );

            setConvertedTotal(data.convertedAmount)
            setRate(data.rate)
        }catch(error){
            console.error("Error convirtiendo moneda: ", error)
        }
    }


    const loadProducts = async () =>{
        try{
        const data = await apiFetch("/products");
        setProducts(data);
        } catch(error){
            console.error("Error al cargar productos: ", error)
        }
    }

    const addToCart = (product) =>{
        setCart((prev)=>{
            const existing = prev.find(p => p._id === product._id);
            if(existing){
                return prev.map(p =>
                    p._id === product._id
                    ? {...p, quantity: p.quantity + 1}
                    : p
                );
            }
            return [...prev, {...product, quantity: 1}]
        })
    }

    const createOrder = async () => {
        const formattedProducts = cart.map(item => ({
            product:item._id,
            quantity: item.quantity
        }));

        await apiFetch("/orders", {
            method:"POST",
            body: JSON.stringify({products: formattedProducts})
        });

        setCart([]);
        loadOrders();
    }

    const loadOrders = async () => {
        try{
            const data = await apiFetch("/orders/my");
            setOrders(data);
        }catch(error){
            console.error("Error al cargar pediddos: ", error);
        }
    };
    useEffect(() =>{
        loadProducts();
        loadOrders();
    }, []);
    
    const displayTotal = currency === "MXN" || convertedTotal === null?total: convertedTotal;

    useEffect(() => {
        if(total > 0){
            convertTotal();
        }
    }, [currency, total])

    return(
        <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Productos</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
        {products.map(p =>(
            <div 
            key={p._id}
            className="bg-gray-50 border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md-transition">
                <h3 className="text-lg font-semibold text-gray-800">
                    {p.name}
                </h3>
                <p className="text-orange-600 font-bold mt-2">
                    ${p.price}
                </p>
                <button 
                onClick={() => addToCart(p)}
                className="mt-4 w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition">
                    Agregar al carrito
                </button>
            </div>
        ))}
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm mb-10">
        <h3 className="text-xl fond-semibold mb-4">Carrito</h3>

        {cart.lenght === 0 &&(
            <p className="text-gray-500">Carrito vacío</p>
        )}

        {cart.map(item =>(
            <div
            key={item._id}
            className="flex justify-between items-center border-b py-2">
                <span className="text-gray-700">
                    {item.name}
                </span>
                <span className="font-medium">
                    x {item.quantity}
                </span>
            </div>
        ))}

        {cart.length > 0 && (
            
            <>
                <div className="mt-4 flex justify-between items-center">
                    <h4 className="text-lg font-bold text-gray-800">
                        Total:
                    </h4>
                    <span className="text-xl font-bold text-orange-600">
                        {displayTotal.toFixed(2)} {currency}
                    </span>
                </div>

                <button
                onClick={createOrder}
                className="mt-6 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
                Realizar Pedido
                </button>
            </>
        )}
        </div>

        <div className="mt-4 flex items-center gap-4">
            <label className="text-xl font-medium text-gray-600">
                Moneda:
            </label>

            <select 
            value={currency} 
            onChange={(e)=> setCurrency(e.target.value)}
            className="border rounded-lg p-2 focus:ring-orange-400 outline-none bg-gray-50">
                <option value="MXN">MXN</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
            </select>
        </div>

        <h2 className="text-2xl font-bold mb-6 mt-3">
            Mis Pedidos
        </h2>

        {orders.length === 0 && <p>No tienes pedidos.</p>}
        
        {orders.map((o)=>(
            <div 
            key={o._id}
            className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm mb-6"
            >
                <div className="flex justify-between items-center mb-4">
                    <span className="font-semibold text-gray-700">
                        Total: ${o.total}
                    </span>

                    <span className="text-sm px-3 py-1 rounded-full bg-blue-100 text-blue-700">
                        {o.status}
                    </span>
                </div>
                
                <ul className="space-y-2">
                    {o.products.map((item, index) =>(
                        <li key={index} className="text-gray-600 text-sm">
                            {item.product?.name} - Cantidad: {item.quantity}
                        </li>
                    ))}
                </ul>
            </div>
        ))}
    </div>
    );
}

export default Orders;