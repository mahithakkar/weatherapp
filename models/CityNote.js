// models/CityNote.js
const mongoose = require('mongoose');

const cityNoteSchema = new mongoose.Schema({
    city: { type: String, required: true },
    note: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CityNote', cityNoteSchema);