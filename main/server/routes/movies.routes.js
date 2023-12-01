import { Router } from "express";
import {
  createMovie,
  deleteMovie,
  updateMovie,
  getMovie,
} from "../controllers/movies.controller.js";
import { getMovies } from "../services/movieService.js";
import { validateCreateMovieRequest } from "../middleware/validations.js";

const router = Router();

router.get("/movies", async (req, res) => {
  try {
    const result = await getMovies();
    res.json(result);
  } catch (error) {
    console.error("getMovies error: ", error.message);
    res.status(500).send();
  }
});

router.get("/movies/:id", getMovie);

router.post("/movies", validateCreateMovieRequest, async (req, res) => {
  const { name, director_id, year } = req.body;

  try {
    const [result] = await pool.query(
      "INSERT INTO movie(name, director_id, year) VALUES (?,?,?)",
      [name, director_id, year]
    );
    res.json({
      id: result.insertId,
      name,
      director_id,
      year,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.put("/movies/:id", updateMovie);

router.delete("/movies/:id", deleteMovie);

export default router;
