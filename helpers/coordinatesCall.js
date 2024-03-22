const axios = require("axios");

async function fetchCoords(cityName) {
  const limit = 1;
  const apiKey = "c774d4cab1c0de230f6bf88780aeb5fe";
  try {
    const response = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=${limit}&appid=${apiKey}`
    );
    const data = response.data[0];
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    throw error;
  }
}

module.exports = {
  fetchCoords,
};
