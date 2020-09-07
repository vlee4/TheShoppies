import React from "react";
import { connect } from "react-redux";
import { updateNoms, deleteNom } from "../Store/nomsReducer";

class SingleMovie extends React.Component {
  constructor() {
    super();
    // this.state = {
    //   nominated: false,
    // };
    this.nominate = this.nominate.bind(this);
    this.removeNom = this.removeNom.bind(this);
  }

  // componentDidMount() {
  //   this.setState({ nominated: this.props.nominated });
  // }

  nominate() {
    if (!this.props.count || this.props.count < 5) {
      // console.log("COUNT FROM SINGLE", this.props.count);
      const { id, Movie } = this.props;
      Movie.nominated = true;
      const nomination = {
        id,
        Movie,
      };
      if (!this.props.nominated) {
        //if not nominated, add nomination
        this.props.addNom(nomination);
        console.log(`${this.props.id} has been nominated`);
        // this.setState({ nominated: true });
      }
    }
  }

  removeNom() {
    console.log("Nomination removed");
    // this.setState({ nominated: false });
    const { id, Movie } = this.props;
    Movie.nominated = false;
    const nomination = {
      id,
      Movie,
    };
    this.props.removeNom(nomination);
  }

  render() {
    // console.log("PROPS", this.props);
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

//nom state needs to be set, when loaded by comparing title to those on nom list. If nom list includes it then button should be disabled

//this.state = {nominated: false}
/*
nominate(){
  if(!this.state.nominated){
    this.setState({nominated: true})
    //add to Nom list
  } else {
    this.setState({nominated: false})
  }
}

removeNom (){
  //update redux list of noms
  //reactivate nominate button in results
}
*/
//button onClick={this.nominate} disabled={this.state.nominated}
//Remove button onClick={this.removeNom}
export default connect(null, mapDispatchToProps)(SingleMovie);
