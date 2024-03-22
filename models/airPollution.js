const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const airPollutionSchema = new Schema({
  coord: {
    lon: Number,
    lat: Number,
  },
  main: {
    aqi: Number,
  },
  components: {
    co: Number,
    no: Number,
    no2: Number,
    o3: Number,
    so2: Number,
    pm2_5: Number,
    pm10: Number,
    nh3: Number,
  },
  dt: Number,
});

module.exports = model("AirPollution", airPollutionSchema);
