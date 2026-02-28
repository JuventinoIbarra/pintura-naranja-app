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


describe("Protected Routes", () => {

    test("Debe bloquear acceso sin token", async () => {
        const res = await request(app)
        .get("/api/orders");

        expect(res.statusCode).toBe(401);
    });

});

afterAll(async () => {
    await mongoose.connection.close();
    await mongoServer.stop();
});