const adverbs = [
  "no aura... wet piece of paper",
  "INSANE aura its over nine thousand!!!!!!!",
  "the aura of a baddie :P",
  "just a little bit of aura.. you can see it but... yeah... its alright I guess",
  "a wee smidge of aura",
  "pretty gorl energy",
];

// Pick a random adverb
const adverb = adverbs[Math.floor(Math.random() * adverbs.length)];

export default `$(user) has ${adverb}`;
