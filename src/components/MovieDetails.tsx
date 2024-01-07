import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import { Link } from 'react-router-dom'
import { useMoviesContext } from "../context";
import { getImageUrl, toHours, formatDate, getCertification, getFilteredCrew, getFilteredCast, getTrailers } from '../utils/Util';
import PersonDefault from '../assets/person.png';
import Header from "./Header";

function MovieDetails(): JSX.Element | null {
    const [movieDetails, setMovieDetails] = useState<MovieDetailsAll>(null);
    const { getMovieDetails } = useMoviesContext();
    const backdropStyle = {
        backgroundImage: `linear-gradient(90deg, rgb(30, 30, 30) 25%, rgb(30, 30, 30) 40%, rgba(30, 30, 30, 0.05) 95%, rgb(30, 30, 30) 100%), url('${getImageUrl(movieDetails?.backdrop_path, null)}')`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#ccc',
    };

    const params = useParams();
    useEffect(() => {
        getMovieDetails(Number(params.movieId)).then((details: MovieDetailsAll) => {
            setMovieDetails(details)
        })
    }, [params.movieId])
    if (!movieDetails) return <>Loading...</>;
    return (
        <div className="bg-gray-50">
            <Header />
            <div className="flex flex-row w-full mx-auto">
                <div className="basis-1/4">
                    <img className="m-auto" src={getImageUrl(movieDetails.poster_path, null)} alt="" />
                </div>
                <div style={backdropStyle} className="pl-2 flex flex-col basis-3/4 text-white">
                    <h1 className="mb-4 font-extrabold text-4xl">{movieDetails.title}</h1>
                    <p className="mb-0">{movieDetails.genres?.map((genre) => genre.name)?.join(", ")}</p>
                    <p className="mb-0">{toHours(movieDetails.runtime)}</p>
                    <div className="flex flex-row mt-auto">
                        <div className="basis-2/5">
                            <p className="mb-0 mt-auto">{movieDetails.overview}</p>
                        </div>
                    </div>
                    <div className="mt-auto gap-3">
                        <p className="mb-0">{getCertification(movieDetails?.release_dates?.results)}</p>
                        <p className="mb-0">{formatDate(movieDetails.release_date)}</p>
                    </div>
                </div>
            </div>
            <div className="m-8">
                <h1 className="font-extrabold text-xl">Crew</h1>
                <div className="flex flex-row">
                    {
                        getFilteredCrew(movieDetails.credits?.crew)?.map((crew, i) => {
                            return (<div key={`crewimg-${i}`}>
                                <img className="p-1 h-80 max-w-56" src={getImageUrl(crew.profile_path, PersonDefault)} />
                                <p className="font-bold">{crew.name}</p>
                                <p className="text-grey">{crew.job}</p>
                            </div>);
                        })
                    }
                </div>
            </div>
            <div className="m-8">
                <h1 className="font-extrabold text-xl">Cast</h1>
                <div className="flex flex-row w-11/20 overflow-x-auto">
                    {
                        getFilteredCast(movieDetails.credits?.cast)?.map((cast, i) => {
                            return (<div key={`castimg-${i}`}>
                                <img className="p-1 h-80 max-w-56" src={getImageUrl(cast.profile_path, PersonDefault)} />
                                <p className="font-bold">{cast.name}</p>
                                <p className="text-grey">{cast.character}</p>
                            </div>);
                        })
                    }
                </div>
            </div>
            <div className="m-8">
                <h1 className="font-extrabold text-xl">Trailers</h1>
                <div className="mb-10 flex flex-row w-11/20 overflow-x-auto overflow-y-hidden">
                    {
                        getTrailers(movieDetails.videos?.results)?.map((video, i) => {
                            return (<div className="p-6 mb-6 h-auto max-w-80" key={`trailer-${i}`} >
                                <iframe className="h-full" loading='lazy' src={`https://www.youtube.com/embed/${video.key}`} allowFullScreen></iframe>
                                <p className="font-bold text-wrap">{video.name}</p>
                            </div>);
                        })
                    }
                </div>
            </div>
            <div className="m-8">
                <h1 className="font-extrabold text-xl">You might be interested in</h1>
                <div className="mb-10 flex flex-row w-11/20 overflow-x-auto overflow-y-hidden">
                    {
                        movieDetails.recommendations?.results?.map((rec, i) => {
                            return (<div key={`rec-${i}`}>
                                <Link to={`/movie/${rec.id}`}>
                                    <img className="p-1 h-auto max-w-56" src={getImageUrl(rec.poster_path, null)} />
                                    <p className="font-bold">{rec.title}</p>
                                </Link>
                            </div>);
                        })
                    }
                </div>
            </div>
        </div>
    )
};

export default MovieDetails;