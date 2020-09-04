import React from "react";
import { connect } from "react-redux";

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
      // TO DO: make component to map results to
      return (
        <div className="results">
          <div>This is a response: {this.props.results.Response}</div>
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
