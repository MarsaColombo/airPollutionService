const axios = require("axios");
async function fetchCoords(cityName) {
  console.log("🚀 ~ fetchCoords ~ cityName:", cityName)
  const limit = 1;
  try {
    const response = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=${limit}&appid=${process.env.OPENAPI_API_KEY}`
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
