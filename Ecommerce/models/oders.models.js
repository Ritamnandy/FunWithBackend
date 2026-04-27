
const mongoose = require("mongoose")

const orderItemsSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Product"
    },
    quantity: {
        type: Number,
        required: true
        
    }
})


const orderSchema = new mongoose.Schema({
    oderPrice: {
        type: Number,
        required:true,
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    orderItems: {
        type: [orderItemsSchema]
        
    },
    address: {
        type: String,
        required:true
    },
    status: {
        type: String,
        emun: ['PENDING', 'CANCELED', 'DELIVERED'],
        default:'PENDING',
    }
}, { timestamps: true })


const Order = mongoose.model("Order", orderSchema)

module.exports = { Order };