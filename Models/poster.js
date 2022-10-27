const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let posterSchema = new Schema(
  {
    name: {
      type: String,
    },
    location: {
      type: String,
    },
    date: {
      type: String,
    },
    picture: [
      {
        name: String,
      },
    ],
    like: [
      {
        name: String,
        status: Number,
        checkinEnabled: Boolean,
      },
    ],
    comments: [
      {
        name: String,
        comment: String,
        date: String,
      },
    ],
  },
  {
    collection: "poster",
  }
);

module.exports = mongoose.model("poster", posterSchema);
