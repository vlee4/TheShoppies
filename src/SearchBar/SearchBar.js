import React from "react";
import { debounce } from "lodash";

class SearchBar extends React.Component {
  constructor() {
    super();
    this.state = {
      query: "",
    };
    this.doSearch = this.doSearch.bind(this);
    this.startSearch = this.startSearch.bind(this);
  }
  //onChange -> trigger timer -> query

  doSearch = debounce(() => {
    console.log(`Searching with: ${this.state.query}`);
    //Make API call
  }, 3000);

  startSearch(e) {
    this.setState({ query: e.target.value });
    if (e.target.value.trim().length) {
      console.log("value", e.target.value.trim());
      this.doSearch();
    }
  }
  render() {
    return (
      <div className="SearchBar">
        <form>
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
