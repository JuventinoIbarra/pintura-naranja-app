const mongoose =require("mongoose");
const connectDB = async () => {
    try{
        //Para pruebas en local
        //await mongoose.connect(process.env.DB_URI)

        //Para Produccion
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB conectado");
        }catch(error){
            console.error(error);
            process.exit(1)
        }
};

module.exports = connectDB;