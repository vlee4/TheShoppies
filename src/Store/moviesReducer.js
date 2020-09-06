//results reducer
import axios from "axios";
import { API_KEY } from "../secrets";
import { startCase } from "lodash";
//Actions
const GET_MOVIES = "GET_MOVIES";
const GET_NOMS = "GET_NOMS";
const ADD_NOM = "ADD_NOM";
const REMOVE_NOM = "REMOVE_NOM";

//Action Creators
const getMovies = (movies, query) => {
  return {
    type: GET_MOVIES,
    movies,
    query,
  };
};

const getNoms = (noms) => {
  return {
    type: GET_NOMS,
    noms,
  };
};

const addNom = (nom) => {
  return {
    type: ADD_NOM,
    nom,
  };
};
const removeNom = (nom) => {
  return {
    type: REMOVE_NOM,
    nom,
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

export const findNoms = () => {
  return async (dispatch) => {
    dispatch(getNoms());
  };
};

export const updateNoms = (nom) => {
  return async (dispatch) => {
    dispatch(addNom(nom));
  };
};

//reducer
export default function movieResultsReducer(state = {}, action) {
  switch (action.type) {
    case GET_MOVIES:
      return { ...state, ...action.movies, query: action.query };
    case GET_NOMS:
      return state.noms;
    case ADD_NOM:
      state.noms.push(action.nom);
      return state.noms;
    default:
      return state;
  }
}
