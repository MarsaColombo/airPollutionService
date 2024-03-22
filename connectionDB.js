const mongoose = require('mongoose');

async function connectDB() {
  const uri = process.env.MONGODB_URI;
  try {
    const connection = mongoose.connect(uri);
    const collectionsPromise = connection.then(() => mongoose.connection.db.listCollections().toArray());

    const [collections] = await Promise.all([collectionsPromise]);

    const collectionNames = collections.map(collection => collection.name);
    return collectionNames;
  } catch (error) {
    console.log("Error", error);
  }
}

module.exports = { connectDB };
