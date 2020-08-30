import React from "react";

class SearchBar extends React.Component {
  constructor() {
    super();
    this.state = {
      query: "",
      typing: false,
    };
    this.doSearch = this.doSearch.bind(this);
    this.startSearch = this.startSearch.bind(this);
  }
  //onChange -> trigger timer -> query

  doSearch() {
    console.log(`Searching with: ${this.state.query}`);
    //Make API call
  }

  startSearch(e) {
    //if query is the same as x seconds ago, and typing is false, do search
    //else just set new query value

    //try debounce
    this.setState({ query: e.target.value });
    setTimeout(() => {
      this.doSearch();
    }, 3000);
  }
  render() {
    return (
      <div className="SearchBar">
        <form>
          {/* <label htmlFor="search">Search for movies: </label> */}
          <input
            type="search"
            placeholder="Search by movie title"
            value={this.state.query}
            onChange={this.startSearch}
          ></input>
        </form>
      </div>
    );
  }
}

export default SearchBar;
