import React from "react";
import "./App.css";
import SearchBar from "./SearchBar/SearchBar.js";
import Results from "./Results/Results.js";
import NomList from "./NomList/NomList";

function App() {
  return (
    <div className="App">
      <h1>~The Shoppies~</h1>
      <SearchBar />
      <div className="content">
        <Results />
        <NomList />
      </div>
    </div>
  );
}

export default App;
