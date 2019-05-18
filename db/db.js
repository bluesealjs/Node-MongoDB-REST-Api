const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const dotenv = require("dotenv");
var uuid = require("uuid/v4");

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

module.exports = Reflection = mongoose.model("reflections", reflectionsSchema);

/**
 * Create Collections
 */
const createCollections = () => {
  const newId = uuid();
  //create document and delete it
  Reflection.create(
    {
      _id: "" + newId,
      success: "demo",
      low_point: "demo",
      take_away: "demo",
      created_date: new Date(),
      modified_date: new Date()
    },
    (error, doc) => {
      if (error) throw error;
      console.log("created collection", doc);
      //delete doc by id
      // Reflection.findOne({ _id: newId }).then(doc => {
      //   if (doc) {
      //     Reflection.deleteOne({ _id: newId }, err => {
      //       if (err) throw err;
      //       console.log("doc id: ", newId, " deleted");
      //     });
      //   } else {
      //     console.log("document id: ", newId, "not exists");
      //     throw doc;
      //   }
      // });
    }
  );
};

//delete all documents in the collection "Reflection"
const deleteAllDocuments = () => {
  Reflection.collection.deleteMany();
};

/**
 * Drop Collections
 */
const dropCollections = async () => {
  pool.collection(Reflection.collection.name).drop((error, results) => {
    if (error) throw error;
    console.log(results);
    pool.close();
  });
};

pool.on("error", () => {
  console.log("error occured!");
});

pool.on("open", () => {
  console.log("connection opened!");
});

module.exports = {
  createCollections,
  dropCollections,
  deleteAllDocuments
};

require("make-runnable");

/*
we require make-runnable package -
We need this to be able to call and any of our two functions from the terminal.
Note: You have to require make-runnable at the end.
Also, don't forget to install make-runnable as project dev-dependency.
*/
