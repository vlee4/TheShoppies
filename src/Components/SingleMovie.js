import React from "react";
import { connect } from "react-redux";
import { updateNoms, deleteNom } from "../Store/nomsReducer";

class SingleMovie extends React.Component {
  constructor() {
    super();
    this.nominate = this.nominate.bind(this);
    this.removeNom = this.removeNom.bind(this);
  }

  nominate() {
    if (!this.props.count || this.props.count < 5) {
      //if no entries in nom list or count below 5
      const { id, Movie } = this.props;
      Movie.nominated = true;
      const nomination = {
        id,
        Movie,
      };
      if (!this.props.nominated) {
        //if not nominated, add nomination
        this.props.addNom(nomination);
      }
    }
  }

  removeNom() {
    const { id, Movie } = this.props;
    Movie.nominated = false;
    const nomination = {
      id,
      Movie,
    };
    this.props.removeNom(nomination);
  }

  render() {
    const { Title, Year } = this.props.Movie;
    return (
      <div className="singleMovie">
        <h4>{Title}</h4>
        <div>ID: {this.props.id}</div>
        <div>Year of Release: {Year}</div>
        {this.props.src === "Results" ? (
          <button onClick={this.nominate} disabled={this.props.nominated}>
            Nominate
          </button>
        ) : (
          <button onClick={this.removeNom}>Remove</button>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addNom: (movie) => dispatch(updateNoms(movie)),
    removeNom: (movie) => dispatch(deleteNom(movie)),
  };
};

export default connect(null, mapDispatchToProps)(SingleMovie);

//session storage
//on search: cache results
//-if same search typed in, return cached results

//on nominate:
//-add nomination to cache
//on remove (of nomination)
//-remove from cache
