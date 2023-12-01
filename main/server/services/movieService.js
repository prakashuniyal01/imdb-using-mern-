import { findMovies } from "../db/movie.js";

export const getMovies = async () => {
  const rows = await findMovies();

  const movieIds = [...new Set(rows.map((row) => row.movieId))];

  return movieIds.map((id) => {
    const movie = rows.find((row) => row.movieId === id);
    const actors = rows
      .filter((row) => row.movieId === id)
      .map((row) => {
        return {
          id: row.actorId,
          name: row.actorName,
          born: row.actorBorn,
          img: row.actorImg,
        };
      });

    return {
      id: movie.movieId,
      name: movie.movieName,
      director: {
        id: movie.directorId,
        name: movie.directorName,
        born: movie.directorBorn,
      },
      year: movie.year,
      actors,
    };
  });
};
