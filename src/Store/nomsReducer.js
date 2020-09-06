//ACTIONS
const GET_NOMS = "GET_NOMS";
const ADD_NOM = "ADD_NOM";
const REMOVE_NOM = "REMOVE_NOM";

//ACTION CREATORS
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

/*state = {
 imdbID1: {movie...},
 imdbID2: {movie...},
 ...
}*/

//REDUCER
export default function nomsReducer(state = {}, action) {
  console.log("ACTION", action);
  switch (action.type) {
    case GET_NOMS:
      return { ...state };
    case ADD_NOM:
      return { ...state, [action.nom.id]: action.nom };
    case REMOVE_NOM:
      const editedNoms = { ...state };
      delete editedNoms[action.nom.id];
      return { ...editedNoms };
    default:
      return state;
  }
}
