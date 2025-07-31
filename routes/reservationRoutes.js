const express = require("express");

const router = express.Router();

const reservationsController = require("../controller/reservationController");

router.get("/reservations", reservationsController.getAllReservations);

router.post("/reservations/new", reservationsController.createReservation);

module.exports = router;
