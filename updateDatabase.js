const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://shelfuser:Soccer123@cluster0.smdvj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

async function updateUsers() {
  try {
    await client.connect();
    const db = client.db('final');
    const usersCollection = db.collection('users');

    // Initialize books and address fields for all users
    const result = await usersCollection.updateMany(
      {},
      { $set: { books: [], address: "" } }
    );

    console.log(`Updated ${result.modifiedCount} users.`);
  } catch (error) {
    console.error('Error updating database:', error);
  } finally {
    await client.close();
  }
}

updateUsers();
updateDatabase.js
