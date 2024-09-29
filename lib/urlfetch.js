async function urlfetch(url) {
  const result = await fetch(url);
  const json = await result.text();
  return json;
}

async function urlfetchJSON(url) {
  const result = await fetch(url);
  const json = await result.json();
  return json;
}

module.exports = { urlfetch, urlfetchJSON };
