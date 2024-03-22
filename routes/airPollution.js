const express = require("express");
const router = express.Router();

const controller = require("../controllers/airPollution.js");

router.get("/", controller.getAirPollution);
router.post("/", controller.postAirPollution);
router.get("/:id", controller.getAirPollutionById);
router.put("/:id", controller.putAirPollution);
router.delete("/:id", controller.deleteAirPollution);

module.exports = router;
