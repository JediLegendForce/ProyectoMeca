var express = require("express");
var router = express.Router();
const booksController = require("../controllers/booksControllers");


//POST
router.post("/create", booksController.booksCreate);
//GET
router.get("/getBooks/:id?", booksController.booksGet);
//DELETE
router.delete("/delete/:id", booksController.deleteBook);
//PUT
router.put("/update/:id", booksController.updateBook);

module.exports = router;