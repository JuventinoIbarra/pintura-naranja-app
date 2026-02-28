import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../services/api"

function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading]= useState(false);
    
    const navigate = useNavigate();
    const handleSubmit = async (e) =>{
        e.preventDefault();
        setLoading(true);
        setError("");
        try{
            const data = await apiFetch("/auth/login", {
                method: "POST",
                body: JSON.stringify({email,password})
            });
    
            localStorage.setItem("token", data.token)
            localStorage.setItem("user", JSON.stringify(data.user))
            
            if(data.user.role === "admin"){
                navigate("/admin");
            } else{
                navigate("/orders");
            }
        } catch(err){
            setError(err.message || "Error al iniciar sesión");
        } finally{
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-400 to-orange-600">
            <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md">
                <div style={{padding:"40px"}}>
                    <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Iniciar Sesión</h2>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <input
                            type="email"
                            placeholder="Correo"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required 
                            className="w-full border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition"/>
                        </div>

                        <div>
                            <input
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                            className="w-full border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition"/>
                        </div>
                        <button 
                        type="submit"
                        disabled={loading}
                        className={`w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition shadow-md ${
                            loading
                            ? "bg-orange-400 cursor-not-allowed"
                            : "bg-orange-500 hover:bg-orange-600"
                        } text-white`}>
                            {loading && (
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            )}
                            {loading ? "Iniciando..." : "Entrar"}
                        </button>
                    </form>
                    {error && (
                        <div className="mt-4 bg-red-100 text-red-700 px-4 py-2 rounded-lg text-sm">
                            {error}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
export default Login;