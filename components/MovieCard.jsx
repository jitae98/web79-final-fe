import React from "react";

const MovieCard = ({ movie, onClick }) => {
  return (
    <div className="movie" onClick={onClick}>
      <img src={movie.image} alt={movie.name} className="poster" />
      <div className="title">{movie.name}</div>
      <div className="info">
        <span className="length">{movie.time} min</span>
        <span className="year">{movie.year}</span>
      </div>
    </div>
  );
};

export default MovieCard;
