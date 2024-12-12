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

app.get('/api/mapPage', async function (req, res) {
    try {
        await client.connect();

        const dbo = client.db("final");
        const collection = dbo.collection('users');

        const books = await collection.find().toArray();
        res.json(books);
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).send('Internal Server Error');
    } finally {
        await client.close();
    }
});

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

  try {
    const user = await usersCollection.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json('Invalid username or password.');
    }

    res.status(200).json({
      message: 'Login successful',
      user: {
        username: user.username,
        name: user.name,
        bio: user.bio,
        address: user.address || '',
        books: user.books || [],
        subscription: user.subscription || ''
      }
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json('An error occurred while logging in.');
  }
});

app.post('/update-profile', async (req, res) => {
  const { username, name, bio, address, books } = req.body;

  try {
    const result = await usersCollection.updateOne(
      { username },
      { $set: { name, bio, address, books } }
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

// Subscription endpoint
app.post('/subscribe', async (req, res) => {
    const { username, subscription } = req.body;

    try {
        const result = await usersCollection.updateOne(
            { username },
            { $set: { subscription } }
        );

        if (result.modifiedCount > 0) {
            res.status(200).send('Subscription updated successfully.');
        } else {
            res.status(400).send('Failed to update subscription.');
        }
    } catch (error) {
        console.error('Error updating subscription:', error);
        res.status(500).send('An error occurred while updating the subscription.');
    }
});

// Unsubscribe endpoint
app.post('/unsubscribe', async (req, res) => {
    const { username } = req.body;

    try {
        const result = await usersCollection.updateOne(
            { username },
            { $unset: { subscription: "" } }
        );

        if (result.modifiedCount > 0) {
            res.status(200).send('Unsubscribed successfully.');
        } else {
            res.status(400).send('Failed to unsubscribe.');
        }
    } catch (error) {
        console.error('Error unsubscribing:', error);
        res.status(500).send('An error occurred while unsubscribing.');
    }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
