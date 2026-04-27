


const express = require("express");

const router = express.Router();

const control = require("../controls/server");

router.get('/', control.getAllNotes);
router.get('/:date',control.getNotesByDate);

router.post('/', control.insertNotes);

router.patch('/:id', control.updateById);
router.delete('/:id', control.deleteById);


module.exports = { router };