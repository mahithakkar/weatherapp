const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('App is running');
});



// --- Added by Person B ---
const mongoose = require('mongoose');
require('dotenv').config();
const notesRouter = require('./routes/notes');
// -------------------------

// --- Added by Person B (Database Connection) ---
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.error("❌ MongoDB Error:", err));

// Use the routes
app.use('/notes', notesRouter);
// -----------------------------------------------

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
