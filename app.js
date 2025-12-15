const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express(); // CREATE APP FIRST

const notesRouter = require('./routes/notes');
const weatherRouter = require('./routes/weather');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Error:', err));

// Routes
app.get('/', (req, res) => {
  res.send('App is running');
});

app.use('/notes', notesRouter);
app.use('/weather', weatherRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
