const MovieReducer: ReducerType = (state, action) => {
    switch (action.type) {
        case 'LIST_MOVIES':
            return {...state, popularMovies: action.payload}
        case 'GET_MOVIE_DETAILS':
            return {...state, movieDetails: action.payload}
        default:
            return state;
    }
  }
  
  export default MovieReducer;