const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 4002;

// Middleware
app.use(cors({
  origin: 'http://localhost:5177' // Allow this origin
}));
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/passop', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Mongoose model
const passwordSchema = new mongoose.Schema({
  site: String,
  username: String,
  password: String,
});

const Password = mongoose.model('Password', passwordSchema);

// API Endpoints
app.post('/submit', async (req, res) => {
  const { site, username, password } = req.body;
  const newPassword = new Password({ site, username, password });
  try {
    await newPassword.save();
    res.status(201).json({ message: 'Password saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving password' });
  }
});

app.get('/passwords', async (req, res) => {
  try {
    const passwords = await Password.find();
    res.status(200).json(passwords);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving passwords' });
  }
});
app.delete('/passwords/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await Password.findByIdAndDelete(id);
      res.status(200).json({ message: 'Password deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting password' });
    }
  });
  app.put('/passwords/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { site, username, password } = req.body;
      const updatedPassword = await Password.findByIdAndUpdate(id, { site, username, password }, { new: true });
      res.status(200).json(updatedPassword);
    } catch (error) {
      res.status(500).json({ message: 'Error updating password' });
    }
  });
  
  app.get('/passwords/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const password = await Password.findById(id);
      if (password) {
        res.status(200).json(password);
      } else {
        res.status(404).json({ message: 'Password not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving password' });
    }
  });
  

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
