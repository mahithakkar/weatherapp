// routes/notes.js
const express = require('express');
const router = express.Router();
const CityNote = require('../models/CityNote');

// GET /notes - Show all notes
router.get('/', async (req, res) => {
    try {
        const notes = await CityNote.find().sort({ date: -1 });
        //res.render('notes', { notes: notes });  change it back to this 
        res.json(notes); //temporaray!!!! 
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

// POST /notes - Save a note
router.post('/', async (req, res) => {
    try {
        await CityNote.create({
            city: req.body.city,
            note: req.body.note
        });
        res.redirect('/notes');
    } catch (err) {
        console.error(err);
        res.status(500).send("Error saving note");
    }
});

module.exports = router;