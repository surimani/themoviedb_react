import { AppendToResponse, AppendToResponseMediaType, Movie, MovieDetails, PopularMovies, TopRatedMovies } from "tmdb-ts";

declare global {
    type MovieDetailsAll = AppendToResponse<MovieDetails, ("videos" | "credits" | "recommendations" | "release_dates")[], AppendToResponseMediaType>;
    
    interface MovieState {
        movieDetails: MovieDetailsAll,
        popularMovies: PopularMovies,
        topMovies: TopRatedMovies,
    }

    interface MovieContextValue extends MovieState {
        listPopularMovies: () => Promise<void>,
        listTopMovies: () => Promise<void>,
        getMovieDetails: (movieId: number) => Promise<MovieDetailsAll>,
    }
    
    interface MovieProps {
        movie: Movie
    }
    
    type ActionTypes = 'LIST_POPULAR_MOVIES' | 'LIST_TOP_MOVIES' |'GET_MOVIE_DETAILS';
    interface Action {
        type: ActionTypes;
        payload?: any;
    }
    
    type ReducerType = (state: MovieState, action: Action) => MovieState;
}


export {}