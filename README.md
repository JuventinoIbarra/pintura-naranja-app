# Pintura Naranja App

Sistema de gestión de pedidos desarollado con arquitectura Full Stack

## Tecnologías Usadas
### Backend
- Node.js
- Express
- MongoDB
- JWT (Autenticación)
- Middleware personalizado
- Axios (Consumo API externa)

### Frontend
- React
- React Router
- Tailwind CSS
- Fetch API

---
## Funcionalidades Implementadas
- Registro de usuarios
- Roles (Administrador/Usuario)
- Rutas Protegidas
- Gestion de pedidos
- Panel de administrador
- Filtros y paginación
- Conversión de moneda (API externa)
- Sistema de sesiones en frontend
- Interfaz responsiva

---
## Arquitectura
### backend/
controllers/
routes/
models/
middlewares/

### frontend/
pages/
components/
services/
---

## Variables de Entorno

Crear un archivo .env en backend con:
MONGO_URI: tu conexion de MongoDB
JWT_SECRET: clave secreta para JWT

---

## Ejecutar el Proyecto

### Backend
En terminal:

cd backend
npm install
npm run dev

### Frontend
cd frontend
npm install
npm run dev

---

## Autor
Juventino Ibarra
Proyecto desarrollado como entrega final del curso
---