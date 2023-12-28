import React, { useState, useEffect } from "react";
import MovieCard from './MovieCard';
import { useMoviesContext } from "../context";
import { Movie } from "tmdb-ts";

function MovieList(): JSX.Element | null {
  const { popularMovies } = useMoviesContext();
  if (!popularMovies) return <>Loading....</>;
  return (
    <div className="flex justify-center flex-wrap gap-3 text-neutral-600">{
      popularMovies && popularMovies.results?.map((movie: Movie) => {
        return <MovieCard movie={movie} key={movie.id} />
      })
    }
    </div>
  );
};

export default MovieList;