// import of dependencies
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bookRoutes = require("./routes/bookRoutes");

// Constants
const MONGO_URI = "mongodb://localhost:27017/bookdb";
const PORT = 4000;

// Middleware
const app = express();
app.use(cors());
app.use(express.json());
app.use("/books", bookRoutes);

// MongoDB connection
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// port listening
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
