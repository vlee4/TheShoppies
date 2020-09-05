import React from "react";

const SingleMovie = ({ Title, Year, src }) => {
  return (
    <div className="singleMovie">
      <h4>{Title}</h4>
      <div>Year of Release: {Year}</div>
      {src === "Results" ? <button>Nominate</button> : <button>Remove</button>}
    </div>
  );
};
//nom state needs to be set, when loaded by comparing title to those on nom list. If nom list includes it then button should be disabled

//this.state = {nominated: false}
/*
nominate(){
  if(!this.state.nominated){
    this.setState({nominated: true})
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
export default SingleMovie;
