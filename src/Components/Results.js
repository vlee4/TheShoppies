import React from "react";
import { connect } from "react-redux";
import SingleMovie from "./SingleMovie";

class Results extends React.Component {
  render() {
    const results = this.props.results;
    if (results && results.Response === "False") {
      return (
        <div className="results">
          No results found for search term:{results.query}{" "}
        </div>
      );
    } else if (!results.Response) {
      return (
        <div className="results">
          Type in a movies name to start nominating movies.
        </div>
      );
    } else {
      console.log("Results:", results);
      return (
        <div className="results">
          <div id="numResults">Results for: "{this.props.results.query}"</div>
          <div>
            {results.Search.map((movie, id) => {
              return (
                <SingleMovie
                  key={id}
                  Title={movie.Title}
                  Year={movie.Year}
                  src="Results"
                />
              );
            })}
          </div>
        </div>
      );
    }
  }
}

const mapsStateToProps = (state) => {
  return {
    results: state.results,
  };
};

export default connect(mapsStateToProps)(Results);
