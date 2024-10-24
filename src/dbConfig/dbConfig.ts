import mongoose from "mongoose";

export async function connect(){

    try {
        await mongoose.connect(process.env.MONGO_URL!) 
        const connection = mongoose.connection;

        connection.on("connected", () => {
            console.log("MongoDB connected successfully")
        })

        connection.on("error", (error) => {
            console.log("MongoDB connection error")
            console.log(error)
        })
        
    } catch (error) {
        console.log("something went wronng")
        console.log(error)
    }
}