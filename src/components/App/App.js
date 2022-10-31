import React from "react";
import Spotify from "../../util/Spotify";
import Playlist from "../Playlist/Playlist";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import "./App.css";

Spotify.getAccessToken();
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistTracks: [],
      playlistName: "New Playlist",
    };

    this.addTracks = this.addTracks.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  updatePlaylistName(newName) {
    this.setState({ playlistName: newName });
  }

  addTracks(trackToAdd) {
    if (
      !this.state.playlistTracks.find(
        (playlistTrack) => playlistTrack.id === trackToAdd.id
      )
    ) {
      let oldTracks = this.state.playlistTracks;
      oldTracks.push(trackToAdd);
      this.setState({ playlistTracks: oldTracks });
    }
  }

  removeTrack(trackToRemove) {
    this.setState({
      playlistTracks: this.state.playlistTracks.filter(
        (playlistTrack) => playlistTrack.id !== trackToRemove.id
      ),
    });
  }

  savePlaylist() {
    const trackUris = this.state.playlistTracks.map(
      (playlistTrack) => playlistTrack.uri
    );

    Spotify.savePlaylist(this.state.playlistName, trackUris);
    this.setState({
      playlistName: "New Playlist",
      playlistTracks: [],
    });
    alert("Playlist saved successfully!");
  }

  search(searchTerm) {
    Spotify.search(searchTerm).then((searchResults) =>
      this.setState({
        searchResults: searchResults,
      })
    );
  }

  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
          <h3 className="signature">
            Built By Caleb Williams and CodeCademy.com
          </h3>
          <SearchBar onSearch={this.search} />
        </h1>
        <div className="App">
          <div className="App-playlist"></div>
          <SearchResults
            searchResults={this.state.searchResults}
            onAdd={this.addTracks}
          />
          <Playlist
            onSave={this.savePlaylist}
            onNameChange={this.updatePlaylistName}
            onRemove={this.removeTrack}
            isRemoval={true}
            name={this.state.playlistName}
            tracks={this.state.playlistTracks}
          />
        </div>
      </div>
    );
  }
}

export default App;
