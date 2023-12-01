import { pool } from "../db.js";

export const getMovie = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query(
      "SELECT movie.id AS movieID, movie.name AS movieName, movie.director_id, director.name AS directorName, movie.year, starring.actor_id, actor.name AS actorName FROM movie JOIN director ON director.id = movie.director_id JOIN starring ON movie.id = starring.movie_id JOIN actor ON actor.id = starring.actor_id WHERE movie.id = ?",
      [id]
    );
    if (result.length === 0)
      return res.status(404).json({
        message: "Movie not found",
      });
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createMovie = async (req, res) => {
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
};

export const updateMovie = async (req, res) => {
  try {
    const result = await pool.query("UPDATE movie SET ? WHERE id = ?", [
      req.body,
      req.params.id,
    ]);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteMovie = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query("DELETE FROM movie WHERE id = ?", [id]);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Movie not found" });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
