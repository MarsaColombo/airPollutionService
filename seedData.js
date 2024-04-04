const axios = require("axios");
const { Schema, model } = require("mongoose");

const cityAirPollution = new Schema({
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

async function fetchData(lon, lat) {
  try {
    const response = await axios.get(
      `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lon}&lon=${lat}&appid=c774d4cab1c0de230f6bf88780aeb5fe`
    );
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    throw error;
  }
}

async function fetchAndPushData(cityName, longitude, latitude) {
  try {
    const {
      coord,
      list: [{ main, dt, components }],
    } = await fetchData(longitude, latitude);

    const airPollutionData = {
      coord,
      main,
      components,
      dt,
    };

    const city = model(cityName, cityAirPollution);
    await city.insertMany(airPollutionData);
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
  }
}

const seedDB = async (cityName, lon, lat) => {
  try {
    await fetchAndPushData(cityName, lon, lat);
    
  } catch (error) {
    console.error("Erreur lors de l'insertion des données:", error);
  }
}

module.exports = { seedDB, cityAirPollution };
