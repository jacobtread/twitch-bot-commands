/**
 * Fetches from the provided URL returning the
 * string response.
 *
 * This function is replaced at built time with the $(urlfetch {URL})
 * template syntax, using this function allows it to be locally tested
 *
 * @param {string} url The URL to fetch from
 * @returns {String} The response
 */
async function urlfetch(url) {
  const result = await fetch(url);
  const json = await result.text();
  return json;
}

/**
 * Fetches JSON from the provided URL returning
 * the JSON response
 *
 * This function is replaced at built time with the $(urlfetch {URL})
 * template syntax, using this function allows it to be locally tested
 *
 * @param {String} url The URL to fetch from
 * @returns {*} The response
 */
async function urlfetchJSON(url) {
  const result = await fetch(url);
  const json = await result.json();
  return json;
}

module.exports = { urlfetch, urlfetchJSON };
