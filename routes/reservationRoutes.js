const express = require("express");

const router = express.Router();

const reservationsController = require("../controller/reservationController");

router.get("/reservations", reservationsController.getAllReservations);

router.post("/reservations/new", reservationsController.createReservation);

router.post(
  "/reservations/filter",
  reservationsController.getReservationsByMovieIds
);

module.exports = router;
