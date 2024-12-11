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

// Registration endpoint
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).send('Username and password are required.');

  const existingUser = await usersCollection.findOne({ username });
  if (existingUser) return res.status(400).send('User already exists.');

  const hashedPassword = await bcrypt.hash(password, 10);
  await usersCollection.insertOne({ username, password: hashedPassword, name: '', bio: '' });
  res.status(201).send('User registered successfully.');
});

// Login endpoint
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await usersCollection.findOne({ username });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).send('Invalid username or password.');
  }

  res.status(200).json({ message: 'Login successful', user: { username: user.username, name: user.name, bio: user.bio } });
});

app.post('/update-profile', async (req, res) => {
  const { username, name, bio, books, address } = req.body;

  try {
    const result = await usersCollection.updateOne(
      { username }, // Find user by username
      { $set: { name, bio, books, address } } // Update all fields
    );

    if (result.modifiedCount > 0) {
      res.status(200).send('Profile updated successfully.');
    } else {
      res.status(400).send('Failed to update profile.');
    }
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).send('An error occurred while updating the profile.');
  }
});

app.get('/get-nearby-users', async (req, res) => {
    const { lat, lng, radius } = req.query;

    if (!lat || !lng || !radius) {
        return res.status(400).send('Latitude, longitude, and radius are required.');
    }

    try {
        const nearbyUsers = await usersCollection.aggregate([
            {
                $geoNear: {
                    near: { type: "Point", coordinates: [parseFloat(lng), parseFloat(lat)] },
                    distanceField: "distance",
                    maxDistance: parseFloat(radius) * 1609.34, // Convert miles to meters
                    spherical: true
                }
            },
            {
                $project: {
                    username: 1,
                    name: 1,
                    address: 1,
                    books: 1,
                    distance: 1
                }
            }
        ]).toArray();

        res.status(200).json(nearbyUsers);
    } catch (error) {
        console.error('Error fetching nearby users:', error);
        res.status(500).send('An error occurred while fetching nearby users.');
    }
});
app.get('/get-swap-locations', async (req, res) => {
    const { lat, lng, radius } = req.query;

    if (!lat || !lng || !radius) {
        return res.status(400).send('Latitude, longitude, and radius are required.');
    }

    try {
        const users = await usersCollection.aggregate([
            {
                $geoNear: {
                    near: { type: "Point", coordinates: [parseFloat(lng), parseFloat(lat)] },
                    distanceField: "distance",
                    maxDistance: parseFloat(radius) * 1609.34, // Convert miles to meters
                    spherical: true
                }
            },
            {
                $project: {
                    username: 1,
                    name: 1,
                    books: 1,
                    location: 1,
                    distance: 1
                }
            }
        ]).toArray();

        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching nearby users:', error);
        res.status(500).send('An error occurred while fetching nearby users.');
    }
});




// Search endpoint
app.get('/search', async (req, res) => {
  const searchTerm = req.query.search;
  if (!searchTerm) {
    return res.status(400).send('Search term is required.');
  }

  try {
    const db = client.db('final');
    const booksCollection = db.collection('books'); // Assume books are in the 'books' collection
    const results = await booksCollection.find({
      title: { $regex: searchTerm, $options: 'i' } // Case-insensitive regex match
    }).toArray();

    res.status(200).json(results);
  } catch (error) {
    console.error('Error fetching book search results:', error);
    res.status(500).send('An error occurred while searching for books.');
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
