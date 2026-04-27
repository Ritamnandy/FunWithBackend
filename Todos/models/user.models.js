

const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique:true,
        trim: true,
        lowercase:true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique:true
    },
    passWord: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    }
}, { timestamps: true })


const User = mongoose.model("User", userSchema);

module.exports = { User };