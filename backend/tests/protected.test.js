require("dotenv").config();
const request = require("supertest");
const app = require("../src/app");
const mongoose = require('mongoose');
const { MongoMemoryServer } = require("mongodb-memory-server")
const connectDB = require("../src/config/db")

let mongoServer;
jest.setTimeout(15000);

beforeAll(async ()=>{
    mongoServer = await MongoMemoryServer.create();
    const uri= mongoServer.getUri();
    await connectDB(uri);
});


describe("Autorización Admin", () => {

    let userToken;

    beforeAll(async () => {
        // Crear usuario normal
        await request(app)
        .post("/api/auth/register")
        .send({
            nombre: "Usuario Test",
            email: `usuario${Date.now}@test.com`,
            password: "123456"
        });

        // Loguear usuario
        const res = await request(app)
        .post("/api/auth/login")
        .send({
            email: `usuario${Date.now}@test.com`,
            password: "123456"
        });

        userToken = res.body.token;
        console.log("Token:", userToken)
    });

    test("Usuario normal no debe acceder a ruta admin", async () => {
        const res = await request(app)
        .get("/api/orders") // ← Cambia si tu ruta admin es diferente
        .set("Authorization", `Bearer ${userToken}`); 

        expect(res.statusCode).toBe(403);
    });

});


afterAll(async () => {
    await mongoose.connection.close();
    await mongoServer.stop();
});