require("dotenv").config()
const connectDb =require("./utils/db");
const Card =require("./models/card-model");

const cardJson =require("./card.json");

const start = async()=>{

    try {
        await connectDb(process.env.MONGODB_URI);
        console.log("Database connected successfully");
        console.log(process.env.MONGODB_URI);
        await Card.deleteMany();
        
        await Card.create(cardJson);
        console.log("success");
    } catch (error) {
        console.log(error)
    }
}
start();