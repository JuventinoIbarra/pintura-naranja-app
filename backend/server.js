require("dotenv").config();

const app = require("./src/app");
const connectDB = require("./src/config/db")
const PORT = process.env.PORT || 3000;

connectDB(process.env.MONGO_URI);

app.listen(PORT, () =>{
    console.log("Api pintura naranja")
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});