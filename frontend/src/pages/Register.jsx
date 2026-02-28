import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../services/api";

function Register() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        nombre: "",
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setForm({
        ...form,
        [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        try {
        await apiFetch("/auth/register", {
            method: "POST",
            body: JSON.stringify(form)
        });


        setSuccess("Usuario registrado correctamente");
        setTimeout(()=> {
            navigate("/login");
        }, 1500);

        } catch (error) {
        setError("Error al registrar usuario");
        console.error(error)
        }finally{
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-400 to-orange-600">
        <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">

            <h2 className="text-2xl font-bold mb-6 text-center">
            Registro
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">

            <input
                type="text"
                name="nombre"
                placeholder="Nombre"
                value={form.nombre}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition"
                required
            />

            <input
                type="email"
                name="email"
                placeholder="Correo"
                value={form.email}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition"
                required
            />

            <input
                type="password"
                name="password"
                placeholder="Contraseña"
                value={form.password}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition"
                required
            />

            <button
                type="submit"
                disabled={loading}
                className={`w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition ${
                    loading
                    ? "bg-orange-400 cursor-not-allowed"
                    : "bg-orange-500 hover:bg-orange-600"
                } text-white`}
            >
                {loading && (
                    <div className="w-4 h-4 border-2 border-white border border-t-transparent rounded-full animate-spin"></div>
                )}

                {loading ? "Registrando..." : "Registrarse"}
            </button>

            </form>
            {error && (
                <div className="mt-4 bg-green-100 text-green-700 px-4 py-2 rounded-lg text-sm">
                    {success}
                </div>
            )}

        </div>
        </div>
    );
    }

export default Register;