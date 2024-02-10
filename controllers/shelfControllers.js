const Model = require("../model/bookmodel");

async function shelfCreate(req, res) {
  const { id, position, category } = req.body;
  const newShelf = new Model.shelf({ id, position, category });
  try {
    await newShelf.save();
    res.send({ message: "Shelf created successfully", status: "200" });
  } catch (err) {
    res.status(500).send({ message: "Internal server error", status: "500" });
  }
}

async function shelfGet(req, res) {
  try {
    const shelfID = req.params.id;
    let data;

    if (shelfID) {
      const shelf = await Model.shelf.findOne({ id: shelfID });
      if (shelf) {
        const books = await Model.book.find({
          id: { $in: shelf.booksID },
        });
        shelf.booksID = books;
      } else {
        return res
          .status(404)
          .send({ message: "Shelf not found", status: "404" });
      }
      data = shelf;
    } else {
      const shelves = await Model.shelf.find();
      if (shelves.length === 0) {
        return res
          .status(404)
          .send({ message: "No shelves found", status: "404" });
      }
      await Promise.all(
        shelves.map(async (shelf) => {
          const books = await Model.book.find({
            id: { $in: shelf.booksID },
          });
          shelf.booksID = books;
        })
      );
      data = shelves;
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

async function shelfUpdate(req, res) {
  try {
    const shelfID = req.params.id;
    const updatedShelf = await Model.shelf.findOneAndUpdate(
      { id: shelfID },
      req.body,
      { new: true }
    );
    if (!updatedShelf) {
      return res
        .status(404)
        .send({ message: "Shelf not found", status: "404" });
    }
    res.send({
      message: "Shelf updated successfully",
      status: "200",
      shelf: updatedShelf,
    });
  } catch (err) {
    res.status(500).send({ message: "Internal server error", status: "500" });
  }
}

async function shelfDelete(req, res) {
  const shelfID = req.params.id;
  const shelf = await Model.shelf.findOne({
    id: shelfID,
  });
  if (shelf) {
    try {
      await Model.shelf.deleteOne({ id: shelfID });
      res.send({ message: "Shelf deleted successfully", status: "200" });
    } catch (err) {
      res.status(500).send({ message: "Internal server error", status: "500" });
    }
  } else {
    res.status(404).send({ message: "Shelf not found", status: "404" });
  }
}

async function shelfAddBook(req, res) {
  const shelfID = req.params.id;
  const { originalBookId, numberOfCopies } = req.body;
  try {
    const shelf = await Model.shelf.findOne({ id: shelfID });
    if (!shelf) {
      return res
        .status(404)
        .send({ message: "Shelf not found", status: "404" });
    }
    const availableCopies = await Model.CopyModel.aggregate([
      { $match: { originalBookId: originalBookId } },
      { $unwind: "$copies" },
      { $match: { "copies.inShelf": false } },
    ]);
    if (availableCopies.length < numberOfCopies) {
      return res
        .status(400)
        .send({ message: "Not enough available copies", status: "400" });
    }

    const copiesToAdd = availableCopies.slice(0, numberOfCopies);
    await Model.shelf.updateOne(
      { id: shelfID },
      {
        $push: {
          copies: { $each: copiesToAdd.map((copy) => copy.copies.copyId) },
        },
      }
    );

    for (let copy of copiesToAdd) {
      await Model.CopyModel.updateOne(
        { "copies.copyId": copy.copies.copyId },
        { $set: { "copies.$.inShelf": true } }
      );
    }

    return res.send({
      message: "Copies added to shelf successfully",
      status: "200",
    });
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Internal server error", status: "500" });
  }
}

module.exports = {
  shelfCreate,
  shelfGet,
  shelfUpdate,
  shelfDelete,
  shelfAddBook,
};