//results reducer
import axios from "axios";
import { API_KEY } from "../secrets";

//Actions
const GET_MOVIES = "GET_MOVIES";

//Action Creators
const getMovies = (movies, query) => {
  return {
    type: GET_MOVIES,
    movies,
    query,
  };
};

//Thunk
export const findMovies = (query) => {
  return async (dispatch) => {
    try {
      let { data } = await axios.get(
        `https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`
      );
      const modData = data.Search.map((datum) => {
        datum.nominated = false;
        return datum;
      });
      data.Search = modData;
      console.log("dispatching the data", data);
      dispatch(getMovies(data, query));
    } catch (err) {
      console.log("error retrieving movies", err);
    }
  };
};

// const State = {
//
// };

//reducer
export default function movieResultsReducer(state = {}, action) {
  switch (action.type) {
    case GET_MOVIES:
      return { ...state, ...action.movies, query: action.query };
    default:
      return state;
  }
}
