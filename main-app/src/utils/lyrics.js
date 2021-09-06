const request = require("request");

//define arrow func for lyrics
const getSongInfo = (songName, artistName, callback) => {
  const apiKey = process.env.MUSIXMATCH_API_KEY;
  const url = `https://api.musixmatch.com/ws/1.1/track.search?q_artist=${artistName}&q_track=${songName}&apikey=${apiKey}`;
  request({ url: url, json: true }, (err, res) => {
    if (err) {
      callback(err, undefined);
      return;
    } else if (res.body.message.body.track_list.length === 0) {
      callback("Track Name Or Artist Name does not match! :(", undefined);
      return;
    }
    callback(undefined, {
      artistName: res.body.message.body.track_list[0].track.artist_name,
      trackName: res.body.message.body.track_list[0].track.track_name,
      albumName: res.body.message.body.track_list[0].track.album_name,
      trackid: res.body.message.body.track_list[0].track.track_id,
    });
  });
};

const getLyrics = (songID, callback) => {
  const apiKey = process.env.MUSIXMATCH_API_KEY;
  const url = `https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${songID}&apikey=${apiKey}`;
  request({ url: url, json: true }, (err, res) => {
    if (err) {
      callback(err, undefined);
    } else if (res.body.message.body.length === 0) {
      callback("Invalid. Recheck Track Name", undefined);
    }
    callback(undefined, {
      lyrics_body: res.body.message.body.lyrics.lyrics_body,
    });
  });
};

module.exports = {
  getSongInfo: getSongInfo,
  getLyrics: getLyrics,
};
