/**
 * Example Usage:
 *
 * !hug {USER}
 *
 * Description:
 *
 * Replies with a message telling them they hugged the target user with a random
 * adverb message along with a counter for how many hugs they've given out in total.
 *
 * Example Response:
 *
 * TestFromUser has hugged TestToUser passionately. TestFromUser has given a total of 2 hugs
 */

const { urlfetchJSON } = require("./lib/urlfetch");

// List of people that have given out hugs
const hugGiverList = (
  await urlfetchJSON(
    "https://twitch.center/customapi/quote/list?token={{REPLACE_ENV_HUG_PUBLIC_KEY}}&no_id=1"
  )
).split(`,`);

// Add a new entry for the user to the hug giving list
const _ = `$(urlfetch https://twitch.center/customapi/addquote?token={{REPLACE_ENV_HUG_PRIVATE_KEY}}&data=$(user),)`;

const actualUser = `$(user)`.toLowerCase();

// Count number of hugs the user has given out
const hugCount = hugGiverList.reduce((count, nameRaw) => {
  const name = nameRaw.replace(/\n/g, "").toLowerCase();
  if (name === actualUser) return count + 1;
  return count;
}, 1);

export default `$(user) has hugged $(touser). $(user) has given a total of ${hugCount} hugs`;
