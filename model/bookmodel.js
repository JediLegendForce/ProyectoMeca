const mongoose = require("mongoose");
const { Schema } = mongoose;

const BookSchema = new mongoose.Schema({
  id: { type: Number, unique: true, required: true },
  name: { type: String, required: true },
  author: String,
  num_pages: Number,
  date_published: Date,
  publisher: { type: String, require: true },
  isbn: { type: String, require: true },
  gender: { type: String, require: true },
  comments: { type: String, require: true },
  edition: { type: String, require: true },
});

const CopySchema = new Schema({
  originalBookId: { type: Number, ref: "Book" },
  copies: [
    {
      _id: false,
      copyId: {
        type: Schema.Types.ObjectId,
        default: function () {
          return new mongoose.Types.ObjectId();
        },
      },
      inShelf: { type: Boolean, default: false },
    },
  ],
});

const ShelfSchema = new mongoose.Schema({
  id: { type: Number, unique: true, required: true },
  position: { type: String, required: true },
  category: { type: String, required: true },
  copies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Copy" }],
});

const book = mongoose.model("books", BookSchema);
const shelf = mongoose.model("shelfs", ShelfSchema);
const CopyModel = mongoose.model("copies", CopySchema);
module.exports = { book, shelf, CopyModel };