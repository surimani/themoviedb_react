import React from "react";
import { Link } from 'react-router-dom'
import { getImageUrl, toHours, formatDate, getCertification, getFilteredCrew, getFilteredCast, getTrailers } from '../utils/Util';

interface MovieProps {
    movie: any
}

function MovieCard(props: MovieProps): JSX.Element | null {
    const { movie } = props;
    return (
        <div className="w-1/3">
            <Link to={`/movie/${movie.id}`}>
                {/* <div className="cursor-pointer my-8 rounded shadow-lg shadow-gray-200 dark:shadow-gray-900 bg-white dark:bg-gray-800 duration-300 hover:-translate-y-1"> */}
                <div className="cursor-pointer p-2 flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                    <img src={getImageUrl(movie.poster_path)}
                        alt={movie.title} className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" />
                    <div className="flex flex-col justify-between p-4 leading-normal min-w-1 text-gray-700">
                        <h2 className="mb-2 text-lg font-semibold">{movie.title}</h2>
                        <p className="mb-2 text-sm"><b>Release Date:</b> {formatDate(movie.release_date)}</p>
                        <p className="mb-4 text-sm"><b>Rating:</b> {movie.vote_average.toFixed(1)}</p>
                        <p className="mb-4 text-sm truncate-ml">{movie.overview}</p>
                    </div>
                </div>
            </Link>
        </div>
    )
};

export default MovieCard;