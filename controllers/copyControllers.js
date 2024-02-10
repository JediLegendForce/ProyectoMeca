const Model = require("../model/bookmodel");

async function copyCreate(req, res) {
  const { bookId, numCopies } = req.body;

  try {
    const book = await Model.book.findOne({ id: bookId });
    if (!book) {
      return res.status(404).send({ message: "Book not found", status: "404" });
    }
    let copy = await Model.CopyModel.findOne({ originalBookId: bookId });
    if (!copy) {
      copy = new Model.CopyModel({ originalBookId: bookId });
    }
    for (let i = 0; i < numCopies; i++) {
      copy.copies.push({ inShelf: false });
    }
    await copy.save();

    res.send({ message: "Copy created successfully", status: "200" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Internal server error", status: "500" });
  }
}

async function copyGet(req, res) {
  try {
    const originalBookId = req.params.id;
    let data;

    if (originalBookId) {
      const copy = await Model.CopyModel.findOne({
        originalBookId: originalBookId,
      });
      if (!copy) {
        return res
          .status(404)
          .send({ message: "Copy not found", status: "404" });
      }
      data = copy;
    } else {
      data = await Model.CopyModel.find();
    }

    res.send({
      message: "Data obtained successfully",
      status: "200",
      data: data,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Internal server error", status: "500" });
  }
}

async function deleteCopy(req, res) {
  try {
    const originalBookId = req.params.id;
    const copy = await Model.CopyModel.findOneAndDelete({
      originalBookId: originalBookId,
    });
    if (!copy) {
      return res.status(404).send({ message: "Copy not found", status: "404" });
    }
    res.send({ message: "Copy deleted successfully", status: "200" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Internal server error", status: "500" });
  }
}

async function updateCopy(req, res) {
  try {
    const originalBookId = req.params.id;
    const copiesToUpdate = req.body;
    let updatedCopy = await Model.CopyModel.findOne({
      originalBookId: originalBookId,
    });

    if (!updatedCopy) {
      return res.status(404).send({ message: "Copy not found", status: "404" });
    }

    for (let copyToUpdate of copiesToUpdate) {
      for (let copy of updatedCopy.copies) {
        if (copy.copyId.toString() === copyToUpdate.copyId) {
          copy.inShelf = copyToUpdate.inShelf;
        }
      }
    }

    updatedCopy = await updatedCopy.save();

    res.send({ message: "Copy updated successfully", status: "200" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Internal server error", status: "500" });
  }
}
module.exports = { deleteCopy, updateCopy, copyGet, copyCreate };