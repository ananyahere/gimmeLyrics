const express = require("express");
const path = require("path");
const hbs = require("hbs");
require('dotenv').config()
const getGIF = require("./utils/gif");
const lyrics = require("./utils/lyrics");

const app = express();
// Define path for express config
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/lyrics", (req, res) => {
  if (!req.query.artist || !req.query.track) {
    return res.send({
      error: "You must provide track and artist name",
    });
  }
  lyrics.getSongInfo(
    req.query.track,
    req.query.artist,
    (error, { artistName, trackName, albumName, trackid } = {}) => {
      if (error) return { error };

      lyrics.getLyrics(trackid, (error, { lyrics_body } = {}) => {
        if (error) return { error };

        getGIF(artistName, (error, { URLtoGIF } = {}) => {
          if (error) return { error };
          res.send({ artistName, trackName, albumName, URLtoGIF, lyrics_body });
        });
      });
    }
  );
});

app.get("*", (req, res) => {
  res.render("404");
});

app.listen(8080, () => {
  console.log("Server is up on port 8080.");
});
