const express = require("express");

const router = express.Router();

const reservationsController = require("../controller/reservationController");

router.get("/reservations", reservationsController.getAllReservations);

router.post("/reservations/new", reservationsController.createReservation);

router.post(
  "/reservations/new",
  reservationsController.getReservationsCountByMovie
);

router.get(
  "/reservations/dashboard",
  reservationsController.getReservationsDashboard
);

router.post(
  "/reservations/filter",
  reservationsController.getReservationsByMovieIds
);

router.get(
  "/reservations/countByMovie",
  reservationsController.getReservationsCountByMovie
);

module.exports = router;
