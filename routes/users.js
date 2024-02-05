var express = require("express");
var router = express.Router();
var axios = require("axios");
const ExampleData = require("../model/nameMongo");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("WEATHER_API: " + process.env.WEATHER_API);
});

router.get("/getApi", async function (req, res, next) {
  try {
    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/forecast?id=524901&appid=" +
        process.env.WEATHER_API
    );
    res.send(response.data);
  } catch (error) {
    console.error("Error al hacer la solicitud con Axios:", error.message);
    res.status(500).send("Error interno del servidor");
  }
});

router.get("/getNames", async function (req, res, next) {
  try {
    const names = await ExampleData.find();
    res.send({
      message: "Data obtained successfully",
      status: "200",
      data: names,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;