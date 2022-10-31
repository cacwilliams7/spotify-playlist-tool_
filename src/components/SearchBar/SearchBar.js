import React from "react";
import "./SearchBar.css";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
    this.handleChange.bind(this);
  }

  search(e) {
    let box = document.getElementById("searchBox");
    this.props.onSearch(box.value);
  }

  handleChange() {
    let box = document.getElementById("searchBox");
    this.search(box.target.value);
  }

  render() {
    return (
      <div className="SearchBar">
        <input
          id="searchBox"
          placeholder="Enter A Song, Album, or Artist"
          onChange={this.search}
        />
        <button className="SearchButton">SEARCH</button>
      </div>
    );
  }
}

export default SearchBar;
