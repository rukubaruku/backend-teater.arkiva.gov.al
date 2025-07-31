const Reservations = require("../model/reservation");

exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservations.find();

    if (!reservations || reservations.length === 0) {
      return res.status(404).json({ message: "Nuk u gjetën rezervime!" });
    }

    res.status(200).json(reservations);
  } catch (error) {
    console.error("Error fetching reservations:", error);
    res.status(500).json({ message: "Server error!" });
  }
};

exports.createReservation = async (req, res) => {
  try {
    const { fullName, nrPeople, movie } = req.body;

    if (!fullName || !nrPeople || !movie) {
      return res.status(400).json({
        success: false,
        message: "Ju lutemi plotësoni të gjitha fushat e nevojshme!",
      });
    }

    const newReservation = new Reservations({
      fullName,
      nrPeople,
      movie,
    });

    const savedReservation = await newReservation.save();

    res.status(200).json({
      message: "Rezervimi u shtua me sukses!",
      data: savedReservation,
    });
  } catch (error) {
    console.error("Gabim gjatë shtimit të rezervimit:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

exports.getReservationsByMovieIds = async (req, res) => {
  try {
    const { movieIds } = req.body;

    if (!Array.isArray(movieIds) || movieIds.length === 0) {
      return res.status(400).json({
        message: "Zgjidhni të paktën një film për të parë rezervimet!",
      });
    }

    const reservations = await Reservations.find({
      movie: { $in: movieIds },
    });

    if (!reservations || reservations.length === 0) {
      return res.status(404).json({
        message: "Nuk u gjetën rezervime për filmat e dhënë.",
        data: [],
      });
    }

    res.status(200).json({
      data: reservations,
    });
  } catch (error) {
    console.error("Error fetching filtered reservations:", error);
    res.status(500).json({
      message: "Server error!",
    });
  }
};
