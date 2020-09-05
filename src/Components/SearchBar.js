import React from "react";
import { debounce } from "lodash";
import { findMovies } from "../Store/moviesReducer";
import { connect } from "react-redux";

class SearchBar extends React.Component {
  constructor() {
    super();
    this.state = {
      query: "",
      submitted: false,
    };
    this.inputVal = React.createRef();
    this.doSearch = this.doSearch.bind(this);
    this.startSearch = this.startSearch.bind(this);
    this.enterSearch = this.enterSearch.bind(this);
  }

  doSearch = debounce(async () => {
    if (!this.state.submitted) {
      //don't trigger search if enter was pressed
      this.setState({ submitted: false });
      console.log(`Searching with: ${this.state.query}`);
      //if response === false/error from moviesReducer; show message: "No results found for: '{this.state.query}'""
      this.props.searchMovies(this.state.query);
    } else {
      //remove later
      console.log("skipped");
    }
  }, 3000);

  startSearch(e) {
    this.setState({ query: e.target.value, submitted: false });
    if (e.target.value.trim().length) {
      this.doSearch(e);
    }
  }

  async enterSearch(e) {
    e.preventDefault();
    this.setState({ query: this.inputVal.current.value, submitted: true });
    this.props.searchMovies(this.state.query);
  }
  render() {
    return (
      <div className="SearchBar">
        <form onSubmit={this.enterSearch}>
          <input
            type="text"
            placeholder="Search by movie title"
            value={this.state.query}
            ref={this.inputVal}
            onChange={this.startSearch}
          ></input>
          <button type="submit" onClick={this.enterSearch}>
            Search
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    searchMovies: (query) => dispatch(findMovies(query)),
  };
};

export default connect(null, mapDispatchToProps)(SearchBar);
