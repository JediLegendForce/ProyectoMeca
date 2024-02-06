const booksController = require("../model/bookmodel");

async function booksCreate(req, res) {
  const newBook = new booksController.book(req.body);
  try {
    await newBook.save();
    res.send({ message: "Book created successfully", status: "200" });
  } catch (err) {
    res.status(500).send({ message: "Internal server error", status: "500" });
  }
}

async function booksGetAll(req, res) {
  try {
    const books = await booksController.book.find();
    res.send({
      message: "Data obtained successfully",
      status: "200",
      data: books,
    });
  } catch (err) {
    res.status(500).send({ message: "Internal server error", status: "500" });
  }
}

async function deleteBook(req, res) {}

module.exports = {
  booksCreate,
  booksGetAll,
  deleteBook,
};
