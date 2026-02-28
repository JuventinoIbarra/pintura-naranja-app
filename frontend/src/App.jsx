import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing"
import Login from "./pages/Login";
import Register from "./pages/Register";
import Orders from "./pages/Orders";
import Admin from "./pages/Admin";
import ProtectedRoutes from "./components/ProtectedRoute";
import Layout from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>}/>

        <Route element={<Layout />}>
          <Route
          path="/orders"
          element={
            <ProtectedRoutes>
              <Orders />
            </ProtectedRoutes>
          }
          />

          <Route
          path="/admin"
          element={
            <ProtectedRoutes role="admin">
              <Admin />
            </ProtectedRoutes>
          }
          />
          </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;