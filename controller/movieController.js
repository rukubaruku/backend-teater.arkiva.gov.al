const Movies = require("../model/movie");

exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movies.find();

    if (!movies || movies.length === 0) {
      return res.status(404).json({ message: "Nuk u gjetën filma!" });
    }

    res.status(200).json(movies);
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).json({ message: "Server error!" });
  }
};

exports.createMovie = async (req, res) => {
  const { title, date, time, status } = req.body;

  try {
    const newMovie = new Movies({ title, date, time, status });
    const savedMovie = await newMovie.save();
    if (savedMovie) {
      return res.status(200).json({ message: "Filmi u shtua me sukses!" });
    }
  } catch (error) {
    console.error("Error creating post:", error);
    return res.status(500).json({ message: "Server error", error: error });
  }
};

exports.getPendingMovies = async (req, res) => {
  try {
    const pendingMovies = await Movies.find({ status: "pending" });

    if (!pendingMovies || pendingMovies.length === 0) {
      return res.status(404).json({ message: "Nuk u gjetën filma në pritje!" });
    }

    res.status(200).json(pendingMovies);
  } catch (error) {
    console.error("Error fetching pending movies:", error);
    res.status(500).json({ message: "Server error!" });
  }
};

exports.updateMovieStatus = async (req, res) => {
  const movieId = req.params.id;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ message: "Status mungon!" });
  }

  try {
    const updatedMovie = await Movies.findByIdAndUpdate(
      movieId,
      { status },
      { new: true }
    );

    if (!updatedMovie) {
      return res.status(404).json({ message: "Filmi nuk u gjet!" });
    }

    res
      .status(200)
      .json({
        message: "Statusi u përditësua me sukses!",
        movie: updatedMovie,
      });
  } catch (error) {
    console.error("Gabim gjatë përditësimit të statusit:", error);
    res.status(500).json({ message: "Gabim në server!" });
  }
};
