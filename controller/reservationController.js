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
      success: true,
      message: "Rezervimi u shtua me sukses!",
      data: savedReservation,
    });
  } catch (error) {
    console.error("Gabim gjatë shtimit të rezervimit:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
