
const express = require("express");
const { mongooseConnection } = require("./db/dbconnection");

const { router } = require("./routes/routers");

const app = express();

app.use(express.urlencoded({ extended: false }));


mongooseConnection('mongodb://127.0.0.1/notes_app_db');


app.use('/api/notesapp', router);

app.listen(8000, () => {
    console.log('Server connected at port 8000');
    
})