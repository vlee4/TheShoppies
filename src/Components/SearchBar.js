import React from "react";
import { debounce } from "lodash";
import { API_KEY } from "../secrets";
import axios from "axios";

class SearchBar extends React.Component {
  constructor() {
    super();
    this.state = {
      query: "",
      submitted: false,
      results: {},
    };
    this.inputVal = React.createRef();
    this.doSearch = this.doSearch.bind(this);
    this.startSearch = this.startSearch.bind(this);
    this.enterSearch = this.enterSearch.bind(this);
  }
  //onChange -> trigger timer -> query

  doSearch = debounce(async () => {
    if (!this.state.submitted) {
      //don't trigger search if enter was pressed
      this.setState({ submitted: false });
      console.log(`Searching with: ${this.state.query}`);
      let { data } = await axios.get(
        `http://www.omdbapi.com/?s=${this.state.query}&apikey=${API_KEY}`
      );
      console.log("HERE's the DATA:", data);
    } else {
      //remove later
      console.log("skipped");
    }
  }, 3000);

  startSearch(e) {
    this.setState({ query: e.target.value, submitted: false });
    if (e.target.value.trim().length) {
      // console.log("value", e.target.value.trim());
      this.doSearch(e);
    }
  }

  async enterSearch(e) {
    e.preventDefault();
    this.setState({ query: this.inputVal.current.value, submitted: true });
    let { data } = await axios.get(
      `http://www.omdbapi.com/?s=${this.state.query}&apikey=${API_KEY}`
    );
    console.log("HERE's the DATA:", data);
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

export default SearchBar;
