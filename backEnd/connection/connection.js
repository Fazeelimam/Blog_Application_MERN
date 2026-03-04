import mongoose from "mongoose";

const ConnectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URI}/BlogApp`);
        console.log("MongoDB Connected");
    } catch (error) {
        console.error("Failed to connect MongoDb", error.message)
        throw error;
    }
}

export default ConnectDB;



