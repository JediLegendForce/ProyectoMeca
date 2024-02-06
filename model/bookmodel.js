const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  id: Number,
  name: String,
  author: String,
  num_pages: Number,
  date_published: Date,
  publisher: String,
  isbn: String,
  gender: String,
  comments: String,
  edition: String,
});

const shelfSchema = new mongoose.Schema({
  id: Number,
  position: String,
  category: String,
  books: [BookSchema],
});

const book = mongoose.model("book", BookSchema);
const shelf = mongoose.model("shelf", shelfSchema);
module.exports = { book, shelf };