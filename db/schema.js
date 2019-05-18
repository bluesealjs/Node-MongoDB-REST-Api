const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const dotenv = require("dotenv");

dotenv.config();
options = { useNewUrlParser: true };
mongoose.connect(process.env.DATABASE_URL, options);
var pool = mongoose.connection;

// Create Schema
const reflectionsSchema = new Schema({
  _id: {
    type: String,
    required: true
  },
  success: {
    type: String,
    required: true
  },
  low_point: {
    type: String,
    required: true
  },
  take_away: {
    type: String,
    required: true
  },
  created_date: {
    type: Date,
    required: true
  },
  modified_date: {
    type: Date,
    required: true
  }
});

pool.on("error", () => {
  console.log("error occured!");
});

pool.on("open", () => {
  console.log("connection opened!");
});

module.exports = Reflection = mongoose.model("reflections", reflectionsSchema);
