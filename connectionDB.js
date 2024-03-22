const mongoose = require('mongoose');

const uri = "mongodb+srv://marsacolombo:7o9HtDdm!%40pxjQym@atlascluster.3fnynnz.mongodb.net/test";

async function connectDB() {
  const collectionListNames = [];
  try {
    await mongoose.connect(uri);
    const dbList =  await mongoose.connection.db.listCollections().toArray();
    
    for await (const collection of dbList){
      collectionListNames.push(collection.name);
    }
  } catch (error) {
    console.log("Error", error);
  }
  return collectionListNames;
};

const getCollectionListNames = async () => {
  const collectionListNames =  await mongoose.connection.db.listCollections().toArray();
  return collectionListNames;
};

module.exports = { connectDB, getCollectionListNames, mongoose };