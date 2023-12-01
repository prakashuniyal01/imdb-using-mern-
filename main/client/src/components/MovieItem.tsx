import React from "react";
import { Actor, Movie } from "../../../typings";
import "./MovieItem.css";
import { Link } from "react-router-dom";

interface MovieItemProps {
  movie: Movie;
}
const MovieItem = ({ movie }: MovieItemProps) => {
  const listActors = (actors: Actor[]) => {
    return actors.map((actor) => (
      <Link key={actor.id} to={`/actors/${actor.id}`}>
        {actor.name}
      </Link>
    ));
  };
  return (
    <div className="movie-item">
      <span className="movie-name">{movie.name}</span>
      <span className="detail">
        <strong>Year:</strong> {movie.year}
      </span>
      <span className="detail">
        <strong>Director:</strong>{" "}
        <Link to={`/directors/${movie.director.id}`}>
          {movie.director.name}
        </Link>
      </span>
      <span className="detail">
        <strong>Starring:</strong> {listActors(movie.actors)}
      </span>
    </div>
  );
};

export default MovieItem;
