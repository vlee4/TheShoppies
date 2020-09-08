import React from "react";
import "./App.css";
import SearchBar from "./Components/SearchBar.js";
import Results from "./Components/Results.js";
import NomList from "./Components/NomList";

function App() {
  return (
    <div className="App">
      <h1>~The Shoppies~</h1>
      <SearchBar />
      <div className="content">
        <Results />
        <NomList />
      </div>
      <footer>
        <div>Last Updated: September 2020</div>
      </footer>
    </div>
  );
}

export default App;
