require("dotenv").config();
const request = require("supertest");
const mongoose = require('mongoose');
const { MongoMemoryServer } = require("mongodb-memory-server")
const connectDB = require("../src/config/db")
const app = require("../src/app");

let mongoServer;
jest.setTimeout(15000);

beforeAll(async ()=>{
    mongoServer = await MongoMemoryServer.create();
    const uri= mongoServer.getUri();
    await connectDB(uri);
})

describe("Auth Routes", () => {

    test("Debe fallar login sin datos", async () => {
        const res = await request(app)
        .post("/api/auth/login")
        .send({});

        expect(res.statusCode).toBe(400);
    });

});

afterAll(async () => {
    await mongoose.connection.close();
    await mongoServer.stop();
});