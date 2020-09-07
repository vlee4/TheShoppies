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
      // const storage = window.sessionStorage;
      if (sessionStorage.getItem(query)) {
        //if repeated search term
        const results = JSON.parse(sessionStorage.getItem(query));
        console.log("STORED QUERY", results);
        dispatch(getMovies(results, query));
      } else {
        //if new search term
        let { data } = await axios.get(
          `https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`
        );
        if (data.Response === "True") {
          const modData = data.Search.map((datum) => {
            datum.nominated = false;
            return datum;
          });
          data.Search = modData;
        }
        sessionStorage.setItem(query, JSON.stringify(data));
        dispatch(getMovies(data, query));
      }
    } catch (err) {
      console.log("Error retrieving movies", err);
    }
  };
};

//reducer
export default function movieResultsReducer(state = {}, action) {
  switch (action.type) {
    case GET_MOVIES:
      return { ...state, ...action.movies, query: action.query };
    default:
      return state;
  }
}
