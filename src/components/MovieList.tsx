import React, { useState, useEffect } from "react";
import { TMDB } from 'tmdb-ts';
import MovieCard from './MovieCard';


const tmdb = new TMDB(global.config.MOVIEDB_API_ACCESS_TOKEN);

const MovieList: React.FC<{}> = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    async function getMovies() {
      try {
        const movies: any = await tmdb.movies.popular({ "page": 1 });
        console.log(movies);
        setMovies(movies.results);
      } catch (err) {
        console.log(err)
      }
    }
    getMovies();
  }, [])

  return (
    <div className="flex justify-center flex-wrap gap-3 text-neutral-600">{
      movies && movies.map((movie: any, i) => {
        return <MovieCard movie={movie} key={movie.id} />
      })
    }
    </div>
  );
};

export default MovieList;