import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

function Layout(){
    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-500 to-orange-400">
            <Navbar />
            <div className="max-w-6xl mx-auto py-12 p-8">
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 min-h-[70vh]">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Layout;