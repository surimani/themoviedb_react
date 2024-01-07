import React, { useMemo, useEffect, createContext, Dispatch, ReactNode, useContext, useReducer } from "react";
import { PopularMovies, TMDB, TopRatedMovies } from "tmdb-ts";
import MovieReducer from "../reducers";

const MOVIEDB_API_ACCESS_TOKEN = process.env.MOVIEDB_API_ACCESS_TOKEN

const initialState: MovieState = {
    movieDetails: null,
    popularMovies: null,
    topMovies: null,
};
const MoviesContext = createContext<MovieContextValue>({
    ...initialState,
    listPopularMovies: () => Promise.resolve(),
    listTopMovies: () => Promise.resolve(),
    getMovieDetails: (movieId: number) => null,
});

export const MoviesContextProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(MovieReducer, initialState);
    const tmdb = new TMDB(MOVIEDB_API_ACCESS_TOKEN);
    const listPopularMovies = async (): Promise<void> => {
        try {
            const movies: PopularMovies = await tmdb.movies.popular({ "page": 1 });
            dispatch({
                type: 'LIST_POPULAR_MOVIES',
                payload: movies,
            });
        } catch (err) {
            console.log(err)
        }
    }
    const listTopMovies = async (): Promise<void> => {
        try {
            const movies: TopRatedMovies = await tmdb.movies.topRated({ "page": 1 });
            dispatch({
                type: 'LIST_TOP_MOVIES',
                payload: movies,
            });
        } catch (err) {
            console.log(err)
        }
    }
    const getMovieDetails = async (movieId: number): Promise<MovieDetailsAll> => {
        try {
            const movieDetails: MovieDetailsAll = await tmdb.movies.details(movieId, ["credits", "videos", "release_dates", "recommendations"]);
            return movieDetails;
        } catch (err) {
            console.log(err)
        }
        return null;
    }
    return (
        <MoviesContext.Provider
            value={{ ...state, listPopularMovies, listTopMovies, getMovieDetails }}>
            {children}
        </MoviesContext.Provider>
    );
};

export const useMoviesContext = () => {
    return useContext(MoviesContext);
};