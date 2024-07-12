import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "./MovieCard.jsx";

const MovieList = ({ onSelectMovie }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("http://localhost:3000/movies", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setMovies(response.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <section className="movies">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onClick={(e) => onSelectMovie(movie, e)}
        />
      ))}
    </section>
  );
};

export default MovieList;
