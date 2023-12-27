import React from "react";
import MovieList from "./components/MovieList";
import MovieDetails from "./components/MovieDetails";
import { Routes, Route } from 'react-router-dom'
import './styles.css';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MovieList />} />
        <Route path="/movie/:movieId" element={<MovieDetails />} />        
      </Routes>
    </div>
  );
};

export default App;