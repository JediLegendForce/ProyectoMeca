var express = require("express");
var router = express.Router();

const booksController = require("../controllers/booksControllers");

//Create
router.post("/create", booksController.booksCreate);

//Get
router.get("/getAll", booksController.booksGetAll);

//Delete
router.delete("/delete/:id", booksController.deleteBook);

module.exports = router;