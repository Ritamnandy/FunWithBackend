

const mongoose = require('mongoose');


const notesSchema = new mongoose.Schema({
    notes: {
        type: String,
        required: true,
        trim: true,
        
    }
}, { timestamps: true });

const notesModel = mongoose.model('Notes', notesSchema);

module.exports = { notesModel };