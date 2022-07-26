const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const multer = require("multer");
var upload = multer();

const app = express();
const port = process.env.PORT || 9000;

app.use(cors());
app.use(express.json());
// for parsing multipart/form-data
app.use(upload.array());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Mongo DB connected successfully");
});

const userRoutes = require("./routes/users");
const excerciseRoutes = require("./routes/exercise");

app.use("/users", userRoutes);
app.use("/excercise", excerciseRoutes);
app.listen(port, () => {
  console.log("server is running at port " + port);
});
