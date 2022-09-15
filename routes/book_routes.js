const express = require('express');
const router = express.Router();
const booksController = require("../controllers/booksController");
const getBooksMagsController = require("../controllers/fetchBooksController");

//adding routes
router.post("/add_authors", booksController.addAuthors);
router.patch("/add_books", booksController.addBooks);
router.patch("/add_mags", booksController.addMagazines);

//fetching routes
router.get("/get_all", getBooksMagsController.getAllBooksMags);
router.get("/get_books/:isbn", getBooksMagsController.getBooksByIsbn);
router.get("/get_mags/:isbn", getBooksMagsController.getMagsByIsbn);
router.post("/get_booksmags", getBooksMagsController.getBooksMagsByEmail);
router.get("/getAll_booksmags", getBooksMagsController.fetchBooksMagsSortByTitle);


//add a custom book and magazine
router.post("/add_author", getBooksMagsController.addNewAuthor);
router.post("/add_book", getBooksMagsController.addNewBook);
router.post("/add_mag", getBooksMagsController.addNewMag);
module.exports = router;