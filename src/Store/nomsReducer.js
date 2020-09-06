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

//REDUCER
export default function nomsReducer(state = [], action) {
  console.log("ACTION", action);
  switch (action.type) {
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
