import { pool } from "../db.js";

export const findMovies = async () => {
  const [rows] = await pool.query(
    "SELECT movie.id AS movieId, movie.name AS movieName, movie.director_id AS directorId, director.name AS directorName, director.born AS directorBorn, movie.year, starring.actor_id AS actorId, actor.name AS actorName, actor.born AS actorBorn, actor.img AS actorImg FROM movie JOIN director ON director.id = movie.director_id JOIN starring ON movie.id = starring.movie_id JOIN actor ON actor.id = starring.actor_id"
  );
  return rows;
};
