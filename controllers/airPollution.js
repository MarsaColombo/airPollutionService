const helper = require("../helpers/airPollution.js");

const getAirPollution = async (req, res) => {
  const response = await helper.getAirPollution(req , res);
  return response;
};

const postAirPollution = async (req, res) => {
  const response = await helper.addAirPollution(req.body);
  res.send(response);
};

const getAirPollutionById = async (req, res) => {
  const statistic = await helper.getOneAirPollution(req.params.id);
  res.send(statistic);
};

const putAirPollution = async (req, res) => {
  const statistic = await helper.updateAirPollution(req );
  res.send(statistic);
};

const deleteAirPollution = async (req, res) => {
  const statistic = await helper.deleteOneAirPollution(req);
  res.send(statistic.id);
  res.send(200)
};

module.exports = {
  getAirPollution,
  postAirPollution,
  getAirPollutionById,
  putAirPollution,
  deleteAirPollution,
};
