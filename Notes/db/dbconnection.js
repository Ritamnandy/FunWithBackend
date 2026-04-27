
const  mongoose = require('mongoose');


const mongooseConnection = (url) => {
    return mongoose.connect(url).then(() => console.log('Mongodb connected')
    ).catch((err) => {
        console.log('Mongodb not connected ');
        
    });
};

module.exports = { mongooseConnection };

// const mongoDB = 'mongodb://127.0.0.1/my_database';
