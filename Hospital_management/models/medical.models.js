

const mongoose = require("mongoose")

const medicalRecordSchema = new mongoose.Schema({}, { timestamps: true })

const medicalRecord = mongoose.model("medicalRecord", medicalRecordSchema);

module.exports = { medicalRecord };