//results reducer
import axios from "axios";
import { API_KEY } from "../secrets";
//actions
const GET_MOVIES = "GET_MOVIES";

//action creators
const getMovies = (movies) => {
  return {
    type: GET_MOVIES,
    movies,
  };
};
//thunk
export const findMovies = (query) => {
  return async (dispatch) => {
    try {
      let { data } = await axios.get(
        `http://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`
      );
      dispatch(getMovies(data));
      console.log("dispatching the data", data);
    } catch (err) {
      console.log("error retrieving movies", err);
    }
  };
};
//reducer
export default function movieResultsReducer(state = [], action) {
  switch (action.type) {
    case GET_MOVIES:
      return action.movies;
    default:
      return state;
  }
}
