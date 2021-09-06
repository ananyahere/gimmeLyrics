const request = require("request");

const getGIF = (artistName, callback) => {
  const api_key = process.env.GIPHY_API_KEY;
  const url = `https://api.giphy.com/v1/gifs/random?tag=${artistName}&api_key=${api_key}`;
  request({ url: url, json: true }, (err, res) => {
    if (err) {
      callback(err, undefined);
      return;
    } else if (res.body.data.length === 0) {
      callback("GIF not found :( ", undefined);
      return;
    }
    callback(undefined, {
      URLtoGIF: res.body.data.images.original.url,
    });
  });
};

module.exports = getGIF;
