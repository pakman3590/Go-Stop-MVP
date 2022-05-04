const deck = [
  'jank', 'jant', 'jan1', 'jan2',
  'feby', 'febt', 'feb1', 'feb2',
  'mark', 'mart', 'mar1', 'mar2',
  'apry', 'aprt', 'apr1', 'apr2',
  'mayy', 'mayt', 'may1', 'may2',
  'juny', 'junt', 'jun1', 'jun2',
  'july', 'jult', 'jul1', 'jul2',
  'augk', 'augy', 'aug1', 'aug2',
  'sepy', 'sept', 'sep1', 'sep2',
  'octy', 'octt', 'oct1', 'oct2',
  'novk', 'nov1', 'nov2', 'nov3',
  'deck', 'decy', 'dect', 'dec2',
];

const shuffleDeck = () => {
  const newDeck = deck.slice();
  for (let i = newDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
  }
  return newDeck;
};

exports.shuffleDeck = shuffleDeck;
