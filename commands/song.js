/**
 * Example Usage:
 *
 * !song
 *
 * Description:
 *
 * Shows the current song a user is listening to, the code for this is not publicly
 * available, it involves a bit of backend code for interacting with spotify
 *
 * Example Response:
 *
 * Maf is listening to "Insert song name" https://spotify.link.here
 */

const { urlfetch } = require("./lib/urlfetch");

const spotifySong = JSON.parse(
  await urlfetch("{{REPLACE_ENV_SONG_SPOTIFY_URL}}")
);

let result = "Uh oh... couldn't get the song soz";

if (spotifySong.song === null) {
  result = "Maf doesn't appear to be listening to anything...";
} else {
  result = `Maf is listening to "${spotifySong.song}" ${spotifySong.spotifyURL}`;
}

export default result;
