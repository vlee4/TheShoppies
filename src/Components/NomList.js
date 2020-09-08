import React from "react";
import SingleMovie from "./SingleMovie";
import { connect } from "react-redux";
import { findNoms } from "../Store/nomsReducer";

class NomList extends React.Component {
  constructor() {
    super();
    this.state = {
      submitted: false,
      mounted: false,
    };
    this.submitNominations = this.submitNominations.bind(this);
  }

  componentDidMount() {
    //if noms already submitted
    if (sessionStorage.getItem("submitted")) {
      this.setState({ submitted: true });
      this.props.loadNoms();
    }
    //if there are unsubmitted nominations
    else if (sessionStorage.getItem("nominations")) {
      this.props.loadNoms();
    } else {
      //no prev nom storage
      sessionStorage.setItem("nominations", JSON.stringify({}));
      sessionStorage.setItem("count", JSON.stringify(0));
    }
    this.setState({ mounted: true });
  }

  componentDidUpdate() {
    const { nominations, count } = this.props;
    const storage_count = sessionStorage.getItem("count")
      ? JSON.parse(sessionStorage.getItem("count"))
      : 0;
    if (storage_count !== count) {
      sessionStorage.setItem("nominations", JSON.stringify(nominations));
      sessionStorage.setItem("count", JSON.stringify(count));
    }
  }

  submitNominations() {
    //Note: if db was connected, this.props.nominations could be sent to redux store and added to the db within a thunk
    sessionStorage.setItem("submitted", JSON.stringify(true));
    this.setState({ submitted: true });
  }

  render() {
    const { nominations } = this.props;
    //if previous storage
    // if (!this.state.mounted && sessionStorage.getItem("nominations")) {
    //   //if DNE
    //   this.props.loadNoms();
    // } else if (this.state.mounted) {
    //   sessionStorage.setItem("nominations", JSON.stringify(nominations));
    // }

    const nomArr = [];
    for (let [key, value] of Object.entries(nominations)) {
      if (key !== "count") {
        nomArr.push({ ...value });
      }
    }
    if (this.state.submitted) {
      return (
        <div className="nomList">
          <div className="nomBanner">
            Thank you for voting. Nominations have been submitted
          </div>
          <h4>You nominated</h4>
          <div className="submitList">
            <ul>
              {nomArr.map((nom, id) => {
                return <li key={`${nom.imdbID}_${id}`}>{nom.Movie.Title}</li>;
              })}
            </ul>
          </div>
        </div>
      );
    }

    return (
      <div className="nomList">
        <h4>Nominations List</h4>
        <div className="nomBanner">
          {nomArr.length === 5 ? "Nominations are full" : ""}
        </div>
        <div>
          {nomArr.length > 0 ? (
            nomArr.map((nom, id) => {
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

const mapDispatchToProps = (dispatch) => {
  return {
    loadNoms: () => dispatch(findNoms()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NomList);

//on load, get noms from session storage if they exist
