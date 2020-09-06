import React from "react";
import { connect } from "react-redux";
import { updateNoms } from "../Store/nomsReducer";

class SingleMovie extends React.Component {
  constructor() {
    super();
    this.state = {
      nominated: false,
    };
    this.nominate = this.nominate.bind(this);
  }

  nominate() {
    console.log("PROPS", this.props);
    const { id, Title, Year } = this.props;
    const nomination = {
      id,
      Title,
      Year,
    };
    if (!this.state.nominated) {
      //if not nominated, add nomination
      this.props.addNom(nomination);
      console.log(`${this.props.id} has been nominated`);
      this.setState({ nominated: true });
    } else {
      //if already nominated, remove nomination
      this.setState({ nominated: false });
    }
  }
  render() {
    const { id, Title, Year, src } = this.props;
    return (
      <div className="singleMovie">
        <h4>{Title}</h4>
        <div>ID: {id}</div>
        <div>Year of Release: {Year}</div>
        {src === "Results" ? (
          <button onClick={this.nominate} disabled={this.state.nominated}>
            Nominate
          </button>
        ) : (
          <button>Remove</button>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addNom: (movie) => dispatch(updateNoms(movie)),
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
