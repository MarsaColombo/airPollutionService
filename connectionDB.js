const mongoose = require('mongoose');

async function connectDB() {
  const uri = process.env.MONGODB_URI;
  await mongoose.connect(uri);
  mongoose.connection.on('connected', async () => {
    try {
      const collections = await mongoose.connection.db.listCollections().toArray();
      const collectionNames = collections.map(collection => collection.name);      
      return collectionNames;
    } catch (error) {
      console.log("Error", error);
    }
    });
    return (await mongoose.connection.db.listCollections().toArray());
}

module.exports = { connectDB };
