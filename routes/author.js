const authorController = require("../controllers/authorController");
const bookController = require("../controllers/bookController");

const router = require("express").Router();

//Add author
router.post("/",authorController.addAuthor);
//get all author 
router.get("/",authorController.getAdllAuthor);
//get an author
router.get("/:id",authorController.getAdllAuthor);

//update an author
router.put(":/id",authorController.updateAuthor);

//delete a book
router.delete("/:id",authorController.deleteAuthor);
module.exports = router;