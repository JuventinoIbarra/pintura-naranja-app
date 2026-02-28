import { useNavigate } from "react-router-dom";

function Landing() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-400 to-orange-600">
        <div className="bg-white rounded-2xl shadow-2xl p-10 text-center max-w-md w-full">
            
            <h1 className="text-3xl font-bold text-orange-600 mb-4">
            Pintura Naranja
            </h1>

            <p className="text-gray-600 mb-8">
            Sistema de gestión de pedidos para productos de maduración y pintura especializada para cítricos.
            </p>

            <div className="flex justify-center gap-4">
            <button
                onClick={() => navigate("/login")}
                className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition"
            >
                Iniciar sesión
            </button>

            <button
                onClick={() => navigate("/register")}
                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition"
            >
                Registrarse
            </button>
            </div>

        </div>
        </div>
    );
    }

export default Landing;