const axios = require("axios");
const { model } = require("mongoose");
const airPollutionSchema = require("./models/airPollution");
const { getCollectionListNames } = require("./connectionDB");

const list =  getCollectionListNames()

const longitude = 50;
const latitude = 50;
const cityName = "Lille";
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

async function fetchAndPushData() {
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
    const AirPollution = model(cityName, airPollutionSchema);

    await AirPollution.insertMany(airPollutionData);
    console.log("Data inserted successfully");
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
  }
}

const seedDB = () => setInterval(fetchAndPushData, 60000);


module.exports = seedDB();
