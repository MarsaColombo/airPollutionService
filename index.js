const { connectDB } = require("./connectionDB.js");
const { seedDB, cityAirPollution } = require("./seedData.js");
const app = require("./connectionServer.js");
const router = require("./routes/airPollution.js");
const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const { fetchCoords } = require("./helpers/coordinatesCall.js") ;
let list = [];

const main = async () => {
  try {
    const dbCollectionList = await connectDB();
    dbCollectionList.forEach((collection) => {
      list.push(collection.name);
    });
    global.list = list;
    return list;
  } catch (error) {
    console.error("Error", error);
  }
};

const manageAirPollutionDocuments = async (list) => { 
  while (true) {
    for await (let i of list) {
      const cityName = i;
    
      const AirPollution = new model(cityName, cityAirPollution);
      let count = await AirPollution.countDocuments();
      const city = await fetchCoords(cityName);      
      const lon = city?.lon;
      const lat = city?.lat;

      if (count <= 0) {
        seedDB(cityName, lon, lat); 
        console.log("No documents found, seeding database...");
      } else if (count > 50) {
        const docs = await AirPollution.find().sort({ _id: 1 }).limit(50);
        const lastDocId = docs[docs.length - 1]._id;
        await AirPollution.deleteMany({ _id: { $gt: lastDocId } })}
        console.log("Database cleaned up, deleting documents...");
    }
    await new Promise(resolve => setTimeout(resolve, 10000));
  }
};

main().then((list) => {
  manageAirPollutionDocuments(list);
});



app.use("/airPollution", router);

app.use((req, res, next) => {
  error = new Error("Not found");
  next(error);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

module.exports = {};
