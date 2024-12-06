import mongoose from "mongoose";
import { DB_Name } from "../env.js";



// call data base
const ConnectDB = async () => {
    try {
        const db = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_Name}`);
        console.log("DB Connected");
    }
    catch (error) {
        console.log(`MongoDB connection error.. ${error}`);
        process.exit(1);
    }
}

export { ConnectDB }