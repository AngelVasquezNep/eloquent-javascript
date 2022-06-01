// Fill in the regular expressions

// 1. car and cat
verify(/ca(r|t)/, ['my car', 'bad cat'], ['camper', 'high art']);

// 2. pop and prop
verify(/p(r?)op/, ['pop culture', 'mad props'], ['plop', 'prrrop']);

// 3. ferret, ferry, and ferrari
verify(
  /ferr(et|y|ari)/,
  ['ferret', 'ferry', 'ferrari'],
  ['ferrum', 'transfer A']
);

// 4. Any word ending in ious
verify(
  /\w+ious\b/,
  ['how delicious', 'spacious room'],
  ['ruinous', 'consciousness']
);

// 5. A whitespace character followed by a period, comma, colon, or semicolon
verify(/\s+(\.|,|:|;)/, ['bad punctuation .', 'hi, I am :'], ['escape the period']);

// 6. A word longer than six letters
verify(
  /\w{7,}/,
  ['Siebentausenddreihundertzweiundzwanzig'],
  ['no', 'three small words']
);

// 7. A word without the letter e (or E)
verify(
  /\b[^\We]+\b/i,
  ['red platypus', 'wobbling nest'],
  ['earth bed', 'learning ape', 'BEET']
);

function verify(regexp, yes, no) {
  // Ignore unfinished exercises
  if (regexp.source == '...') {
    return;
  }

  for (let str of yes) {
    if (!regexp.test(str)) {
      console.log(`Failure to match '${str}'`);
    }
  }
  for (let str of no) {
    if (regexp.test(str)) {
      console.log(`Unexpected match for '${str}'`);
    }
  }
}
