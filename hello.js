const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const { MongoClient } = require('mongodb');

const app = express();
const port = process.env.PORT || 3000;

// MongoDB connection
const uri = "mongodb+srv://shelfuser:Soccer123@cluster0.smdvj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

let usersCollection;

// Connect to MongoDB
client.connect().then(() => {
  const db = client.db('final');
  usersCollection = db.collection('users');
  console.log('Connected to MongoDB');
}).catch(err => console.error('Failed to connect to MongoDB:', err));

// Serve the login page as default
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve the map page
app.get('/map.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'map.html'));
});

// Other endpoints (register, login, update-profile, etc.)
// [Your existing endpoints here...]

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
