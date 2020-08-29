import React from "react";

function SearchBar() {
  return (
    <div className="SearchBar">
      <form>
        {/* <label htmlFor="search">Search for movies: </label> */}
        <input type="search" placeholder="Search by movie title"></input>
      </form>
    </div>
  );
}

export default SearchBar;
