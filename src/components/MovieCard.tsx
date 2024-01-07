import React from "react";
import { Link } from 'react-router-dom'
import { getImageUrl, formatDate } from '../utils/Util';

function MovieCard({movie}: MovieProps): JSX.Element | null {
    return (
        <div className="shadow-xl h-full bg-white border border-gray-100 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <Link to={`/movie/${movie.id}`}>
                <div className="cursor-pointer p-2 flex flex-col md:flex-row md:max-w-xl items-center">
                    <img src={getImageUrl(movie.poster_path, null)}
                        alt={movie.title} className="object-cover w-full rounded-t-lg h-full sm:w-48" />
                    <div className="flex flex-col justify-between p-4 leading-normal min-w-1 text-gray-700">
                        <h2 className="mb-2 text-lg font-semibold">{movie.title}</h2>
                        <p className="mb-2 text-sm"><b>Release Date:</b> {formatDate(movie.release_date)}</p>
                        <p className="mb-4 text-sm"><b>Rating:</b> {movie.vote_average?.toFixed(1)}</p>
                        <p className="mb-4 text-sm truncate-ml">{movie.overview}</p>
                    </div>
                </div>
            </Link>
        </div>
    )
};

export default MovieCard;