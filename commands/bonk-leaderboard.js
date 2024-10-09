/**
 * Example Usage:
 *
 * !bonk-leaderboard
 *
 * Description:
 *
 * Leaderboard for the !bonk command, lists the top 3 most bonked people and
 * how many times each of them was bonked
 *
 * Example Response:
 *
 * Bonkers Leaderboard -----|_| 1st TestFromUser - 3 times
 */

const { urlfetchJSON } = require("./lib/urlfetch");

const userCounts =
  // List of people that have already been bonked (Contains an entry for the person every time they've been bonked)
  (
    await urlfetchJSON(
      "https://twitch.center/customapi/quote/list?token={{REPLACE_ENV_BONK_PUBLIC_KEY}}&no_id=1"
    )
  )
    // Split to all the individual entries
    .split(`,`)
    // Build up the list of pairs [name, count]
    .reduce((counts, nameRaw) => {
      const name = nameRaw.toLowerCase();
      const index = counts.findIndex((entry) => entry[0] === name);
      index === -1 ? counts.push([name, 1]) : counts[index][1]++;
      return counts;
    }, [])
    // Sort from the highest to lowest bonk count
    .sort((a, b) => b[1] - a[1])
    // Only take the top 3 people
    .slice(0, 3);

const suffixes = ["st", "nd", "rd"];

// Build up the list of the first 3 people
const out = userCounts
  // Create the actual person item (i.e 1st NAME - 3 times)
  .map(
    (value, index) =>
      `${index + 1}${suffixes[index]} ${value[0]} - ${value[1]} times`
  )
  // Join to a single string
  .join(" ");

export default `Bonkers Leaderboard -----|_| ${out}`;
