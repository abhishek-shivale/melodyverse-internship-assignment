import mongoose from "mongoose";

const connectDatabase = ()=>{
    mongoose.connect(process.env.MONGOURL);

    mongoose.connection.on("connected", () => {
        console.log("Database is connected");
    });

    mongoose.connection.on("error", (err) => {
        console.log("Error occurred in database", err);
    });

    mongoose.connection.on("disconnected", () => {
        console.log("Database is disconnected");
    });
    
}

export default connectDatabase