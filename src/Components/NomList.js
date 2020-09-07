import React from "react";
import SingleMovie from "./SingleMovie";
import { connect } from "react-redux";

class NomList extends React.Component {
  constructor() {
    super();
    this.state = {
      submitted: false,
    };
    this.submitNominations = this.submitNominations.bind(this);
  }

  submitNominations() {
    //Note: if db was connected, this.props.nominations could be sent to redux store and added to the db within a thunk
    this.setState({ submitted: true });
  }

  render() {
    if (this.state.submitted) {
      return (
        <div className="nomList">
          <div className="nomBanner">
            Thank you for voting. Nominations have been submitted
          </div>
        </div>
      );
    }

    const { nominations } = this.props;
    // console.log("HERE are the Nominations:", nominations);
    const nomArr = [];
    for (let [key, value] of Object.entries(nominations)) {
      if (key !== "count") {
        nomArr.push({ ...value });
      }
    }
    // console.log("HERE are the Nominations:", nomArr);
    return (
      <div className="nomList">
        <h4>Nominations List</h4>
        <div className="nomBanner">
          {nomArr.length === 5 ? "Nominations are full" : ""}
        </div>
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
        {nomArr.length === 5 ? (
          <button onClick={this.submitNominations}>Submit</button>
        ) : (
          ""
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    nominations: state.nominations,
  };
};

export default connect(mapStateToProps)(NomList);
