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
      dispatch(getMovies(data, query));
      console.log("dispatching the data", data);
    } catch (err) {
      console.log("error retrieving movies", err);
    }
  };
};

// const initialState = {
//   noms: [],
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
