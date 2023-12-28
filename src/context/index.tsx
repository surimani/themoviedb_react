import React, { useMemo, useEffect, createContext, Dispatch, ReactNode, useContext, useReducer } from "react";
import MovieReducer from "../reducers";
import { TMDB } from "tmdb-ts";

const MOVIEDB_API_ACCESS_TOKEN = 'TO BE REPLACED HERE';

const initialState: MovieState = {
    movieDetails: null,
    popularMovies: null,
};
const MoviesContext = createContext<MovieContextValue>({
    ...initialState,
    listMovies: () => Promise.resolve(),
    getMovieDetails: (movieId: number) => null,
});

export const MoviesContextProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(MovieReducer, initialState);
    const tmdb = new TMDB(MOVIEDB_API_ACCESS_TOKEN);
    const listMovies = async (): Promise<void> => {
        try {
            const movies: any = await tmdb.movies.popular({ "page": 1 });
            dispatch({
                type: 'LIST_MOVIES',
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
    useEffect(() => {
        listMovies();
    }, []);
    return (
        <MoviesContext.Provider
            value={{ ...state, listMovies, getMovieDetails }}>
            {children}
        </MoviesContext.Provider>
    );
};

export const useMoviesContext = () => {
    return useContext(MoviesContext);
};