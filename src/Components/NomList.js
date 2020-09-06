import React from "react";
import SingleMovie from "./SingleMovie";
import { connect } from "react-redux";

class NomList extends React.Component {
  render() {
    const { nominations } = this.props;
    // console.log("HERE are the Nominations:", nominations);
    const nomArr = [];
    for (let [key, value] of Object.entries(nominations)) {
      nomArr.push({ ...value });
    }
    console.log("HERE are the Nominations:", nomArr);
    return (
      <div className="nomList">
        <h4>Nominations List</h4>
        <div>
          {nomArr.length > 0 ? (
            nomArr.map((nom, id) => {
              // console.log("individual nom", nom);
              nom = nom.Movie;
              return (
                <SingleMovie
                  key={`${nom.imdbID}_${id}`}
                  id={nom.imdbID}
                  Movie={nom}
                  src="Nom"
                />
              );
            })
          ) : (
            <div>Select a movie to be added to the Nomination list</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    nominations: state.nominations,
  };
};

//Fetch list of nominated movies
export default connect(mapStateToProps)(NomList);
