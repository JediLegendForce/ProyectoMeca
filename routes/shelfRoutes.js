var express = require("express");
var router = express.Router();
const shelfController = require("../controllers/shelfControllers");

//POST
router.post("/create", shelfController.shelfCreate);
router.post("/addBook/:id", shelfController.shelfAddBook);

//GET
router.get("/getShelf/:id?", shelfController.shelfGet);

//PUT
router.put("/update/:id", shelfController.shelfUpdate);

//DELETE
router.delete("/delete/:id", shelfController.shelfDelete);



module.exports = router;