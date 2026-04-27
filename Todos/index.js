

require('dotenv').config()

const express = require("express");

const app = express();

const port = 4000;

app.get('/', (req, res) => {
    return res.send("Hello World!");
})

app.get('/youtube', (req, res) => {
    res.json({messege:'hello'})
})

app.listen(process.env.PORT, () => {
    console.log('server started at port:',port);
    
})