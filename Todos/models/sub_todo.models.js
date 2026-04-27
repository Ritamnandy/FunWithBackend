
const mongoose = require("mongoose")

const subTodoSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    complete: {
        type: Boolean,
        default: false

    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

}, { timestamps: true })

const subTodo = mongoose.model("subTodo", subTodoSchema);


module.exports = { subTodo };