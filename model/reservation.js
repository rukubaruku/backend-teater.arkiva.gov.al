const mongoose = require("mongoose");

const reservationsSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    nrPeople: {
      type: String,
      required: true,
    },

    movie: {
      type: String,
      required: true,
    },
  },
  { collection: "reservations" }
);

module.exports = mongoose.model("Reservations", reservationsSchema);
