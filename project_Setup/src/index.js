

import express from "express";

import  connectDB  from "./db/db.connect.js";

const app = express();

connectDB()































// const app = express();
// // async function connectDB() {
// //     try {
// //         await mongoose.connect(`${p}`)
// //     } catch (error) {
        
// //     }
// // }

// (async () => {
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URL}${db_name}`)
//         app.on("error", () => {
//             console.log("error");
            
//         })
//         app.listen(process.env.PORT, () => {
//             console.log("Server started at port:",process.env.PORT);
//             console.log('database connected');
            
//         })
//     } catch (error) {
//         console.log("database not connect");
        
//     }
// })()











