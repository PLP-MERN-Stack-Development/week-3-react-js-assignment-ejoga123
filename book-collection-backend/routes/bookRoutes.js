const express = require("express");
const router = express.Router();
const Book = require("../models/book");

// create
router.post("/", async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
