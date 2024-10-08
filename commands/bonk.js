/**
 * Example Usage:
 *
 * !bonk {USER}
 *
 * Description:
 *
 * "Bonks" another user with a hammer, says the bonking message and a count for how
 * many times that user has been "bonked" already.
 *
 * Example Response:
 *
 * -----|_| TestFromUser has bonked TestToUser. TestToUser has been bonked 12 times.
 */

const { urlfetchJSON } = require("./lib/urlfetch");

// List of people that have already been bonked (Contains an entry for the person every time they've been bonked)
const bonkList = (
  await urlfetchJSON(
    "https://twitch.center/customapi/quote/list?token={{REPLACE_ENV_BONK_PUBLIC_KEY}}&no_id=1"
  )
).split(`,`);

// Triggers the API that will update the counter to add the new entry
const _ = `$(urlfetch https://twitch.center/customapi/addquote?token={{REPLACE_ENV_BONK_PRIVATE_KEY}}&data=$(touser),)`;

// Number of times that user has been bonked
let bonkCount = 0;

const actualUser = `$(touser)`.toLowerCase();

for (var i = 0; i < bonkList.length; i += 1) {
  const value = bonkList[i].replace(/\n/g, "").toLowerCase();

  // Increase counter for every time the target user is found
  if (value === actualUser) {
    bonkCount++;
  }
}

export default `-----|_| $(user) has bonked $(touser). $(touser) has been bonked ${
  bonkCount + 1
} times.`;
