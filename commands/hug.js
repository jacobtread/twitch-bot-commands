
// Adverbs that are used to describe the hug
const adverbs = ['passionately', 'aggressively', 'weirdly']

// Pick a random adverb
const adverb = adverbs[Math.floor(Math.random() * adverbs.length)];

export default `$(user) has hugged $(touser) ${adverb}`;
