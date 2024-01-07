import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { PopularMovies, TopRatedMovies } from 'tmdb-ts';
import { HashRouter } from 'react-router-dom'
import { MoviesContextProvider, useMoviesContext } from '../context'; // Update with the correct path
import App from '../App';

// Mock TMDB class and its methods
jest.mock('tmdb-ts', () => {
  return {
    TMDB: class MockTMDB {
      movies = {
        popular: jest.fn().mockResolvedValue(mockPopularMovies),
        topRated: jest.fn().mockResolvedValue(topRatedMovies),
        details: jest.fn().mockResolvedValue({ id: 123 }),
      };

      constructor(apiKey: string) {
        console.log("Custom TMDB class has been called")
      }
    },
  };
});
jest.setTimeout(10000);

describe('Movie List', () => {
  it('renders popular movies', async () => {
    const { getByText } = render(
      <MoviesContextProvider>
        <HashRouter>
          <App />
        </HashRouter>
      </MoviesContextProvider>
    );

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });

    expect(getByText('Popular Movie 1')).toBeInTheDocument();
    expect(getByText('Popular Movie 2')).toBeInTheDocument();
  });

  it('renders top rated movies', async () => {
    const { getByText } = render(
      <MoviesContextProvider>
        <HashRouter>
          <App />
        </HashRouter>
      </MoviesContextProvider>
    );

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();      
    });

    await act(async () => {
      userEvent.click(screen.getByText('Top Rated Movies'));
    });

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
      expect(screen.queryByText('Popular Movie 1')).not.toBeInTheDocument();
    });

    expect(getByText('Top Rated Movie 3')).toBeInTheDocument();
    expect(getByText('Top Rated Movie 4')).toBeInTheDocument();
  });
});


//TEST DATA to be passed to mock functions
const mockPopularMovies: PopularMovies = {
  results: [{
    id: 1, title: 'Popular Movie 1', poster_path: '/poster1.jpg', adult: false, overview: 'Overview for Movie 1', release_date: '2022-01-01',
    genre_ids: [1], original_title: 'Title 1', original_language: 'en', backdrop_path: '/poster11.jpg', popularity: 10, vote_average: 7,
    vote_count: 11, video: false
  },
  {
    id: 2, title: 'Popular Movie 2', poster_path: '/poster2.jpg', adult: false, overview: 'Overview for Movie 2', release_date: '2022-02-01',
    genre_ids: [2], original_title: 'Title 2', original_language: 'en', backdrop_path: '/poster22.jpg', popularity: 50, vote_average: 7,
    vote_count: 51, video: false
  }],
  page: 1, total_pages: 2, total_results: 2
};

const topRatedMovies: TopRatedMovies = {
  results: [{
    id: 1, title: 'Top Rated Movie 3', poster_path: '/poster1.jpg', adult: false, overview: 'Overview for Movie 3', release_date: '2022-05-06',
    genre_ids: [3], original_title: 'Title 3', original_language: 'en', backdrop_path: '/poster11.jpg', popularity: 190, vote_average: 8.5,
    vote_count: 151, video: false
  },
  {
    id: 2, title: 'Top Rated Movie 4', poster_path: '/poster2.jpg', adult: false, overview: 'Overview for Movie 4', release_date: '2022-07-08',
    genre_ids: [2], original_title: 'Title 4', original_language: 'en', backdrop_path: '/poster22.jpg', popularity: 160, vote_average: 8.5,
    vote_count: 191, video: false
  }],
  page: 1, total_pages: 2, total_results: 2
};
