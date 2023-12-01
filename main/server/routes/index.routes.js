import { Router } from "express";
import { pool } from "../db.js";

const router = Router();

/*
router.get("/ping", async (req, res) => {
  const [rows] = await pool.query("SELECT 1 + 1 AS result");
  console.log(rows);
  res.json(rows[0]);
});
*/

router.get("/ping", async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM director");
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// returns movie data with director name
router.get("/ping2", async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT movie.id, movie.name AS movieName, movie.director_id, director.name AS directorName, movie.year FROM movie JOIN director ON director.id = movie.director_id"
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// returns movie data with director name and actors (multiple same movie records because of multiple actors in the same movie)
router.get("/ping3", async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT movie.id AS movieID, movie.name AS movieName, movie.director_id, director.name AS directorName, movie.year, starring.actor_id, actor.name AS actorName FROM movie JOIN director ON director.id = movie.director_id JOIN starring ON movie.id = starring.movie_id JOIN actor ON actor.id = starring.actor_id"
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router;
