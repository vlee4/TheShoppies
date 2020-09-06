import React from "react";
// import SingleMovie from "./SingleMovie";
import { connect } from "react-redux";

function NomList() {
  //let {results} = this.props;
  return (
    <div className="nomList">
      <div>This is the Nom List</div>
      {/* <div>
            {results.Search.map((movie) => {
              return (
                <SingleMovie
                   key={`${movie.imdbID}_${id}`}
                  id={movie.imdbID}
                  Title={movie.Title}
                  Year={movie.Year}
                  src="Noms"
                />
              );
            })}
          </div> */}
    </div>
  );
}
//Fetch list of nominated movies
export default connect()(NomList);
