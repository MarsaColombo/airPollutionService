const { response } = require("express");
const coords = require("./coordinatesCall");
const { seedDB } = require("../seedData.js");
const{ model } = require("mongoose");
const { cityAirPollution } = require("../seedData.js");
const getAirPollution = async (req, res) => {
  try {
    const { city } = req.query;
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    
    if(!global.list.includes(city)){
      await seedDB(city);
    }

    if (!city) {
      return res.status(400).send({ message: "City is a required parameter." });
    }
    const localisation = await coords.fetchCoords(city);

    if (!localisation) {
      return res.status(404).send({ message: "Localisation not found." });
    }

    const { lon, lat } = localisation;

    if (!lon || !lat) {
      return res.status(400).send({ message: "Longitude and Latitude are required parameters." });
    }

    if (page < 1 || pageSize < 1) {
      return res.status(400).send({ message: "Pagination parameters must be positive integers." });
    }

    const skip = (page - 1) * pageSize;

    const AirPollutionModel = model(city, cityAirPollution);

    const airPollution = await AirPollutionModel.find({
    })
      .sort({ dt: -1 })
      .skip(skip)
      .limit(pageSize);

    if (!airPollution || airPollution.length === 0) {
      return res.status(404).send({ message: "No air pollution data found." });
    }

    return res.status(200).send({
      data: airPollution,
      message: "Air pollution data retrieved successfully.",
    });
  } catch (error) {
    console.error("Error fetching air pollution data:", error);
    return res.status(500).send({ message: "Error fetching air pollution data." });
  }
};

const getOneAirPollution = async (json) => {
  try {
    const airPollution = await AirPollution.findById(json.id);

    if (!airPollution || airPollution.length === 0) {
      return res
        .status(404)
        .send({ message: "Aucune donnée de pollution de l'air trouvée." });
    }
    return res.status(200).send({
      data: airPollution,
      message: "Données de pollution de l'air récupérées avec succès.",
    });
  } catch (error) {
    console.error(error);
  }
  return response;
};
const addAirPollution = async (json) => {
  try {
    const newAirPollution = new AirPollution(json);
    await newAirPollution.save();
    return newAirPollution;
  } catch (error) {
    console.error(error);
  }
  return response;
};
const updateAirPollution = async (json) => {
  const { id } = json.params;
  const { body } = json;
  try {
    const airPollution = await AirPollution.findByIdAndUpdate(id, body, {
      new: true,
    });
    return airPollution;
  } catch (error) {
    console.error(error);
  }
  return response;
};

const deleteOneAirPollution = async (json) => {
  const { id } = json.params;
  try {
    const deletedAirPollution = await AirPollution.findByIdAndDelete(id);
    return deletedAirPollution;
  } catch (error) {
    console.error(error);
  }
  return response;
};
module.exports = {
  getAirPollution,
  getOneAirPollution,
  addAirPollution,
  updateAirPollution,
  deleteOneAirPollution,
};
