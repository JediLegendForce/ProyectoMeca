var express = require("express");
var router = express.Router();
const copyController = require("../controllers/copyControllers");

//POST
router.post("/addCopy", copyController.copyCreate);

//GET
router.get("/getCopy/:id?", copyController.copyGet);

//DELETE
router.delete("/delete/:id", copyController.deleteCopy);

//PUT
router.put("/update/:id", copyController.updateCopy);

module.exports = router;