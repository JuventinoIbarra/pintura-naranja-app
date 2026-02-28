import { useNavigate } from "react-router-dom";

function Navbar(){
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
    };

    return(
        <div className="bg-white/90 backdrop-blur shadow-md">
            <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
                <h1 className="text-xl font-bold text-orange-600">
                    Pintura Naranja
                </h1>
                <div className="flex items-center gap-4">
                    <span className="text-gray-600 text-sm">
                        {user?.email}
                    </span>
                    <button 
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition">
                        Cerrar Sesión
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Navbar;