const MovieReducer: ReducerType = (state, action) => {
    switch (action.type) {
        case 'LIST_POPULAR_MOVIES':
            return {...state, popularMovies: action.payload}
        case 'LIST_TOP_MOVIES':
            return {...state, topMovies: action.payload}    
        case 'GET_MOVIE_DETAILS':
            return {...state, movieDetails: action.payload}
        default:
            return state;
    }
  }
  
  export default MovieReducer;