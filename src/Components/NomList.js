import React from "react";
import SingleMovie from "./SingleMovie";

function NomList() {
  //let {results} = this.props;
  return (
    <div className="nomList">
      <div>This is the Nom List</div>
      {/* <div>
            {results.Search.map((movie, id) => {
              return (
                <SingleMovie
                  key={id}
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
export default NomList;
