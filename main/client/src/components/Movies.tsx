import React, { useEffect, useState } from "react";
import { Movie } from "../../../typings";
import MovieItem from "./MovieItem";
import "./Movies.css";
import { Link } from "react-router-dom";
import axios from "axios";

const Movies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  const fetchMovies = async () => {
    try {
      const fetchedMovies: Movie[] = (
        await axios.get("http://localhost:4000/movies")
      ).data;

      setMovies(fetchedMovies);
    } catch (error: any) {
      console.error("fetchMovie error: ", error.message);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="movies">
      <h1>Movies</h1>
      <Link to="/createMovie">Add Movie</Link>
      <div className="details">
        {movies.map((movie, index) => (
          <MovieItem key={index} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Movies;
