import React from "react";
import { connect } from "react-redux";
import SingleMovie from "./SingleMovie";

class Results extends React.Component {
  render() {
    const results = this.props.results;
    if (results && results.Response === "False") {
      return (
        <div className="results">
          <h4 className="resultsBanner">
            No results found for: {results.query}
          </h4>
        </div>
      );
    } else if (!results.Response) {
      return (
        <div className="results">
          <h4 className="resultsBanner">
            Type in a title to start nominating movies
          </h4>
        </div>
      );
    } else {
      const { nominations } = this.props;
      return (
        <div className="results">
          <h4 className="resultsBanner">
            Results for: "{this.props.results.query}"
          </h4>
          <div>
            {results.Search.map((movie, id) => {
              return (
                <SingleMovie
                  key={`${movie.imdbID}_${id}`}
                  id={movie.imdbID}
                  Movie={movie}
                  nominated={
                    nominations[movie.imdbID]
                      ? nominations[movie.imdbID].Movie.nominated
                      : movie.nominated
                  }
                  count={nominations.count}
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
    nominations: state.nominations,
  };
};

export default connect(mapsStateToProps)(Results);
