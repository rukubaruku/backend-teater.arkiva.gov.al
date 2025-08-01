const express = require("express");

const router = express.Router();

const movieController = require("../controller/movieController");

router.get("/movies", movieController.getAllMovies);

router.post("/movies/new", movieController.createMovie);

router.get("/movies/pending", movieController.getPendingMovies);

router.patch("/:id", movieController.updateMovieStatus);

module.exports = router;
