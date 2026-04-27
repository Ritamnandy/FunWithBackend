
const mongoose = require("mongoose")

const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    complete: {
        type: Boolean,
        default:false
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        
    },
    subTodos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"subTodo"
        }
    ] // array of subtodos
}, { timestamps: true })

const Todo = mongoose.model("Todo", TodoSchema);


module.exports = { Todo };