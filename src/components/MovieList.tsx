import React, { useState, useEffect } from "react";
import { Movie } from "tmdb-ts";
import MovieCard from './MovieCard';
import { useMoviesContext } from "../context";
import Header from "./Header";

function MovieList({movieType}: {movieType: string}): JSX.Element | null {
  const moviesContext = useMoviesContext();
  if (!moviesContext) return <>Loading...</>;
  const { popularMovies, topMovies, listTopMovies, listPopularMovies } = moviesContext;
  useEffect(() => {
    if (!topMovies && movieType == "toprated")
      listTopMovies();
    else if (!popularMovies)
      listPopularMovies();
  }, [movieType]);
  if ((movieType == "popular" && !popularMovies) || (movieType == "toprated" && !topMovies)) return <>Loading...</>;
  return (
    <div className="bg-gray-50">
      <Header />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 m-4">
      {(movieType == "toprated") ? (
        topMovies && topMovies.results?.map((movie: Movie) => {
          return <MovieCard movie={movie} key={movie.id} />
        })
       ) : (
        popularMovies && popularMovies.results?.map((movie: Movie) => {
          return <MovieCard movie={movie} key={movie.id} />
        })        
      )}      
      </div>
    </div>
  );
};

export default MovieList;