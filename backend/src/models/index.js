import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connect2DB = () => {
    const dbURL = process.env.MONGODB_URL;
    return mongoose.connect(dbURL, {
        dbName: "tweetyDB",
    });
};
