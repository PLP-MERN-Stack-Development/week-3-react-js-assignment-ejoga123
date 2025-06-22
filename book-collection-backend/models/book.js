const mongoose = require("mongoose");

// Define the schema for the Book model
const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  publicationYear: Number,
  genre: String,
});

module.exports = mongoose.model("Book", bookSchema);
