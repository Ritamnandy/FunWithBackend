
import {app} from "./app.js";
import dotenv from "dotenv";

import  {connectDB}  from "./db/db.connect.js";

dotenv.config();
const port =process.env.PORT||8000
connectDB().then(() => {
    app.listen(port, () => {
        console.log("Server is runing at port:- ",port);
        
    })
    
}).catch((err) => {
    console.log("Server is not runing");
    
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











