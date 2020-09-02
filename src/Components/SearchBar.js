import React from "react";
import { debounce } from "lodash";
import { API_KEY } from "../secrets";
import axios from "axios";

class SearchBar extends React.Component {
  constructor() {
    super();
    this.state = {
      query: "",
      results: {},
    };
    this.doSearch = this.doSearch.bind(this);
    this.startSearch = this.startSearch.bind(this);
  }
  //onChange -> trigger timer -> query

  doSearch = debounce(async () => {
    console.log(`Searching with: ${this.state.query}`);
    let { data } = await axios.get(
      `http://www.omdbapi.com/?s=${this.state.query}&apikey=${API_KEY}`
    );
    console.log("HERE's the DATA:", data);
  }, 3000);

  startSearch(e) {
    this.setState({ query: e.target.value });
    if (e.target.value.trim().length) {
      // console.log("value", e.target.value.trim());
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
