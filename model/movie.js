const mongoose = require("mongoose");

const movieSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },

    time: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  { collection: "movies" }
);

module.exports = mongoose.model("Movie", movieSchema);
