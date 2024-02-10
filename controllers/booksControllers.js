const booksModel = require("../model/bookmodel");

async function booksCreate(req, res) {
  const newBook = new booksModel.book(req.body);
  try {
    await newBook.save();
    res.send({ message: "Book created successfully", status: "200" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Internal server error", status: "500" });
  }
}

async function booksGet(req, res) {
  try {
    const bookID = req.params.id;
    let data;

    if (bookID) {
      // Get one book
      const book = await booksModel.book.findOne({ id: bookID });
      if (!book) {
        return res
          .status(404)
          .send({ message: "Book not found", status: "404" });
      }
      data = book;
    } else {
      // Get all books
      data = await booksModel.book.find();
    }

    res.send({
      message: "Data obtained successfully",
      status: "200",
      data: data,
    });
  } catch (err) {
    res.status(500).send({ message: "Internal server error", status: "500" });
  }
}

async function deleteBook(req, res) {
  try {
    const bookID = req.params.id;
    console.log(bookID);
    await booksModel.book.deleteOne({ id: bookID });
    res.send({ message: "Book deleted successfully", status: "200" });
  } catch (err) {
    res.status(500).send({ message: "Internal server error", status: "500" });
  }
}

async function updateBook(req, res) {
  try {
    const bookID = req.params.id;
    const updatedBook = await booksModel.book.findOneAndUpdate(
      { id: bookID },
      req.body,
      { new: true }
    );
    if (!updatedBook) {
      return res.status(404).send({ message: "Book not found", status: "404" });
    }
    res.send({ message: "Book updated successfully", status: "200" });
  } catch (err) {
    res.status(500).send({ message: "Internal server error", status: "500" });
  }
}

module.exports = {
  booksCreate,
  deleteBook,
  updateBook,
  booksGet,
};
