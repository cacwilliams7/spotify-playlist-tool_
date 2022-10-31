import React from "react";
import Track from "../Track/Track";
import "./TrackList.css";

class TrackList extends React.Component {
  render() {
    return (
      <div className="TrackList">
        {this.props.tracks.map((trackElement) => {
          return (
            <Track
              onAdd={this.props.onAdd}
              onRemove={this.props.onRemove}
              key={trackElement.id}
              track={trackElement}
              isRemoval={this.props.isRemoval}
            />
          );
        })}
      </div>
    );
  }
}

export default TrackList;
