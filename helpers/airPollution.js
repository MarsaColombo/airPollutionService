const { response } = require("express");
const AirPollution = require("../models/airPollution.js");
const coords = require("./coordinatesCall");
const { fetchAndPushData } = require("../seedData.js");
const getAirPollution = async (req, res) => {
  const { city } = req.query;
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;

  const localisation = await coords.fetchCoords(city);
  if (!localisation) {
    return;
  }
  const { lon, lat } = localisation;
  const collectionList = global.list;
  
  try {
    if (!lon || !lat) {
      return res
        .status(400)
        .send({ message: "Les paramètres lon et lat sont nécessaires." });
    }

    if(!collectionList.includes(city)){
      fetchAndPushData(city, lon, lat);
      console.log(collectionList);
    }

    if (page < 1 || pageSize < 1) {
      return res.status(400).send({
        message:
          "Les paramètres de pagination doivent être des entiers positifs.",
      });
    }

    const skip = (page - 1) * pageSize;

    const airPollution = await AirPollution.find({
      "coord.lon": parseInt(lon),
      "coord.lat": parseInt(lat),
    })
      .sort({ dt: -1 })
      .skip(skip)
      .limit(pageSize);

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
    console.error(
      "Erreur lors de la récupération des données de pollution de l'air:",
      error
    );
    return res.status(500).send({
      message:
        "Erreur lors de la récupération des données de pollution de l'air.",
    });
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
