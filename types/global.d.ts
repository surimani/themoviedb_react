import { AppendToResponse, AppendToResponseMediaType, Movie, MovieDetails, PopularMovies } from "tmdb-ts";

declare global {
    type MovieDetailsAll = AppendToResponse<MovieDetails, ("videos" | "credits" | "recommendations" | "release_dates")[], AppendToResponseMediaType>;
    
    interface MovieState {
        movieDetails: MovieDetailsAll,
        popularMovies: PopularMovies,        
    }

    interface MovieContextValue extends MovieState {
        listMovies: () => Promise<void>,
        getMovieDetails: (movieId: number) => Promise<MovieDetailsAll>,
    }
    
    interface MovieProps {
        movie: Movie
    }
    
    type ActionTypes = 'LIST_MOVIES' | 'GET_MOVIE_DETAILS';
    interface Action {
        type: ActionTypes;
        payload?: any;
    }
    
    type ReducerType = (state: MovieState, action: Action) => MovieState;
}


export {}