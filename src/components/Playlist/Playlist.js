import React from "react";

import TrackList from "../TrackList/TrackList";
import "./Playlist.css";

class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(e) {
    this.props.onNameChange(e.target.value);
  }

  render() {
    return (
      <div className="Playlist">
        <input
          id="playlistName"
          defaultValue={this.props.name}
          onChange={this.handleNameChange}
        />
        <TrackList
          tracks={this.props.tracks}
          isRemoval={true}
          onRemove={this.props.onRemove}
        />
        <button onClick={this.props.onSave} className="Playlist-save">
          SAVE TO SPOTIFY
        </button>
      </div>
    );
  }
}

export default Playlist;
