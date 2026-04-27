
const { notesModel } = require("../models/dbmodel");

const mongoose = require("mongoose");

const getAllNotes = async (req, res) => {
    const allNotes = await notesModel.find({});
    return res.status(200).json(allNotes);
}

const getNotesByDate = async (req, res) => {
    const inputDate = new Date(req.params.date);

    const start = new Date(inputDate);
    start.setHours(0, 0, 0, 0);
    const end = new Date(inputDate);
    end.setHours(23, 59, 59, 999);

    const notes = await notesModel.find({
        createdAt: {
            $gte: start,
            $lte: end
        }
    });
    return res.status(200).json(notes);
}


const insertNotes = async (req, res) => {
    const body = req.body;
    console.log(body);
    
    if (!body.notes) {
        return res.status(400).json({ massege: 'notes are required' });
    }
    await notesModel.create({
        notes : body.notes
    })
    return res.status(201).json({ massege: 'notes inserted Sucessfully' });
}


const updateById = async (req, res) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ massege: 'Invalid id' });
    }
    await notesModel.findByIdAndUpdate(id, { notes: req.body.notes });
    return res.status(200).json({ massege: 'Sucess' });
}


const deleteById = async (req, res) => {
     const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ massege: 'Invalid id' });
    }
    await notesModel.findByIdAndDelete(id);
    return res.status(200).json({ massege: 'Sucess' });
}


module.exports = { getAllNotes,getNotesByDate,updateById,deleteById,insertNotes };