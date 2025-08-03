const express = require("express");

const router = express.Router();

const movieController = require("../controller/movieController");

router.get("/movies", movieController.getAllMovies);

router.post("/movies/new", movieController.createMovie);

router.get("/movies/pending", movieController.getPendingMovies);

router.get("/movies/dashboard", movieController.getMoviesDashboard);

router.patch("/:id", movieController.updateMovieStatus);

router.get("/movies/:id", movieController.getOneMovie);

router.put("/movies/update/:id", movieController.updateMovie);

module.exports = router;
