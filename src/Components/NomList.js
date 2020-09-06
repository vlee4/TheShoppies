import React from "react";
import SingleMovie from "./SingleMovie";
import { connect } from "react-redux";

class NomList extends React.Component {
  render() {
    const { nominations } = this.props;
    const nomArr = [];
    for (let [key, value] in Object.entries(nominations)) {
      nomArr.push({ [key]: value });
    }
    return (
      <div className="nomList">
        <h4>Nominations List</h4>
        <div>
          {nomArr.length > 0 ? (
            nomArr.map((nom, id) => {
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
