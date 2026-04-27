// require('dotenv').config()


import dotenv from "dotenv";
import mongoose from "mongoose";

import { db_name } from "../constants.js";

dotenv.config()

const connectDB = async () => {
    try {
        const connectionresponse = await mongoose.connect(`${process.env.MONGODB_URL}/${db_name}`)
        
        console.log("Mongodb connected !! DB HOST:- ",connectionresponse.connection.host);
        
    } catch (error) {
        console.log("data base not connected",error);
        
    }
}

export default  connectDB ;