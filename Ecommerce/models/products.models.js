
const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        
    },
    name: {
        type: String,
        required: true,
    },
    productImage: {
        type: String,

    },
    price: {
        type: Number,
        default:0
    },
    stock: {
        type: Number,
        default:0
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
        
    },
    Owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }

}, { timestamps: true });



const Product = mongoose.model("Product", productsSchema);


module.exports = { Product };