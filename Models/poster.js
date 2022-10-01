const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let posterSchema = new Schema(
  {
    name: {
      type: String,
    },
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
      },
    ],
  },
  {
    collection: "poster",
  },
 
);

module.exports = mongoose.model("poster", posterSchema);
