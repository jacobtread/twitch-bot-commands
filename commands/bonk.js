const { urlfetch } = require("./lib/urlfetch");

// List of people that have already been bonked (Contains an entry for the person every time they've been bonked)
const bonkList = (
  await urlfetch(
    "https://twitch.center/customapi/quote/list?token={{REPLACE_ENV_BONK_PUBLIC_KEY}}&no_id=1"
  )
).split(`,`);

// Triggers the API that will update the counter to add the new entry
const _ = `$(urlfetch https://twitch.center/customapi/addquote?token={{REPLACE_ENV_BONK_PRIVATE_KEY}}&data=$(touser),)`;

// Number of times that user has been bonked
let bonkCount = 0;

for (var i = 0; i < bonkList.length; i += 1) {
  const value = bonkList[i];

  // Increase counter for every time the target user is found
  if (value === `$(touser)`) {
    bonkCount++;
  }
}

export default `-----|_| $(user) has bonked $(touser). $(touser) has been bonked ${
  bonkCount + 1
} times.`;
