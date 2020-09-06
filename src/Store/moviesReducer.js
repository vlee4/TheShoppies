//results reducer
import axios from "axios";
import { API_KEY } from "../secrets";

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

const postNom = (nom) => {
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
  return (dispatch) => {
    dispatch(getNoms());
  };
};

export const updateNoms = (nom) => {
  return async (dispatch) => {
    try {
      console.log("updated noms with", nom);
      dispatch(postNom(nom));
    } catch (error) {
      console.log("Error adding nomination", error);
    }
  };
};

export const deleteNom = (nom) => {
  return (dispatch) => {
    dispatch(removeNom(nom));
  };
};

const initialState = {
  noms: [],
};

//reducer
export default function movieResultsReducer(state = initialState, action) {
  console.log("ACTION", action);
  switch (action.type) {
    case GET_MOVIES:
      return { ...state, ...action.movies, query: action.query };
    case GET_NOMS:
      return { ...state, noms: action.noms };
    case ADD_NOM:
      const updatedNoms = [...state.noms, action.nom];
      return { ...state, noms: updatedNoms };
    case REMOVE_NOM:
      const editedNoms = state.noms.filter((movie) => {
        return movie.id !== action.nom.id;
      });
      return { ...state, noms: editedNoms };
    default:
      return state;
  }
}
