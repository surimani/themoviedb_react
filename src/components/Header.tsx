import React from "react";
import { Link } from 'react-router-dom'

function Header(): JSX.Element | null {
    return (
        <header>
            <nav className="flex items-center justify-between flex-wrap bg-teal-400 p-3">
                <div className="flex items-center flex-no-shrink text-white mr-6">
                    <span className="font-semibold text-xl tracking-tight">The Movie Database</span>
                </div>
                <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                    <div className="text-md lg:flex-grow">
                        <Link to="/popular" className="block mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-white mr-4">
                            Popular Movies
                        </Link>
                        <Link to="/toprated" className="block mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-white mr-4">
                            Top Rated Movies
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    )
};

export default Header;