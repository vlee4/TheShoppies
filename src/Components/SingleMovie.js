import React from "react";

const SingleMovie = ({ Title, Year }) => {
  return (
    <div className="singleMovie">
      <h4>{Title}</h4>
      <div>Year of Release: {Year}</div>
      <button>Nominate</button>
    </div>
  );
};

export default SingleMovie;
