const { connectDB } = require("./connectionDB.js");
const seedDB = require("./seedData.js");
const app = require("./connectionServer.js");
const AirPollution = require("./models/airPollution.js");
const router = require("./routes/airPollution.js");
const mongoose = require("mongoose");

const manageAirPollutionDocuments = async () => {
  let count = await AirPollution.countDocuments();

  while (true) {
    if (count > 50) {
      console.log("🚀 ~ manageAirPollutionDocuments ~ count:", count);
      const docs = await AirPollution.find().sort({ _id: 1 }).limit(49);
      const lastDocId = docs[docs.length - 1]._id;
      await AirPollution.deleteMany({ _id: { $gt: lastDocId } });
      console.log("deleted successfully");
    } else if (count < 50) {
      seedDB;
    }

    count = await AirPollution.countDocuments();
    await new Promise((resolve) => setTimeout(resolve, 60000));
  }
};

const main = async () => {
  try {
    dbCollectionList = await connectDB();
    await manageAirPollutionDocuments();
    return dbCollectionList;
  } catch (error) {
    console.error("Error", error);
  }
};

main();

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

