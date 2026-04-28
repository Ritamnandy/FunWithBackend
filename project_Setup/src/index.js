
import {app} from "./app.js";
import dotenv from "dotenv";

import  connectDB  from "./db/db.connect.js";

dotenv.config();

connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log("Server started at port:- ",process.env.PORT);
        
    })
    
}).catch((err) => {
    console.log("Server not started");
    
})































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











