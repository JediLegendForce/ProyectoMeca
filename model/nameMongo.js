const mongoose = require("mongoose");

const ExampleDataSchema = new mongoose.Schema({
  name: String,
});

const ExampleData = mongoose.model("example_datas", ExampleDataSchema);

module.exports = ExampleData;