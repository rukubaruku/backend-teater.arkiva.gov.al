const express = require("express");

const router = express.Router();

const movieController = require("../controller/movieController");

router.get("/movies", movieController.getAllMovies);

router.post("/movies/new", movieController.createMovie);

module.exports = router;
