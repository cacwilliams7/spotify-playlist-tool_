let userToken = undefined;
let expiresIn = undefined;
const clientId = "a69ddcbb64c640f399acfcbdd2138fad";
const redirectURI = "http://jammingbyCW7.surge.sh";
//const redirectURI = "http://localhost:3000";

const Spotify = {
  getAccessToken() {
    if (userToken) {
      return userToken;
    }
    const userTokenQuery = window.location.href.match(/access_token=([^&]*)/);
    const expiresInQuery = window.location.href.match(/expires_in=([^&]*)/);

    if (userTokenQuery && expiresInQuery) {
      userToken = userTokenQuery[1];
      expiresIn = expiresInQuery[1];
      window.setTimeout(() => (userToken = ""), expiresIn * 1000);
      window.history.pushState("Access Token", null, "/");
    } else {
      window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
    }
  },

  search(term) {
    //tracks = [];
    const searchUrl = `https://api.spotify.com/v1/search?type=track&q=${term.replace(
      " ",
      "%20"
    )}`;
    return fetch(searchUrl, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {
        if (!jsonResponse.tracks) return [];
        return jsonResponse.tracks.items.map((track) => {
          return {
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri,
          };
        });
      });
  },

  savePlaylist(playlistName, trackURIs) {
    if (!playlistName || !trackURIs) return;
    let userToken = this.getAccessToken();
    let headers = {
      Authorization: `Bearer ${userToken}`,
    };
    let userID = undefined;
    let playlistId = undefined;
    const userURL = "https://api.spotify.com/v1/me";

    return fetch(userURL, { headers: headers })
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {
        userID = jsonResponse.id;
      })
      .then(() => {
        const createPlaylistUrl = `https://api.spotify.com/v1/users/${userID}/playlists`;
        fetch(createPlaylistUrl, {
          method: "POST",
          headers: headers,
          body: JSON.stringify({
            name: playlistName,
          }),
        })
          .then((response) => response.json())
          .then((jsonResponse) => (playlistId = jsonResponse.id))
          .then(() => {
            const addPlaylistTracksUrl = `https://api.spotify.com/v1/users/${userID}/playlists/${playlistId}/tracks`;
            fetch(addPlaylistTracksUrl, {
              method: "POST",
              headers: headers,
              body: JSON.stringify({
                uris: trackURIs,
              }),
            });
          });
      });
  },
};

export default Spotify;
