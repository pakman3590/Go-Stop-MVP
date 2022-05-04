/* eslint-disable import/prefer-default-export */
function singleMatch(card1, field) {
  const matches = [];
  field.forEach((cardId) => {
    if (card1.slice(0, 3) === cardId.slice(0, 3)) {
      matches.push(cardId);
    }
  });
  // LATER: IMPLEMENT CHOICE BETWEEN TWO MATCHES
  if (matches.length === 1 || matches.length === 2) {
    return [matches[0], card1];
  }
  return false;
}

const logicChain = [
  function ttadak(card1, card2, field) {
    const matches = [];
    if (card1.slice(0, 3) === card2.slice(0, 3)) {
      field.forEach((cardId) => {
        if (card1.slice(0, 3) === cardId.slice(0, 3)) {
          matches.push(cardId);
        }
      });
      if (matches.length === 2) {
        console.log('Ttadak!');
        return [matches, [card1, card2], []];
      }
    }
    return false;
  },

  function threeStack(card1, card2, field) {
    const matches = [];
    field.forEach((cardId) => {
      if (card1.slice(0, 3) === cardId.slice(0, 3)) {
        matches.push(cardId);
      }
    });
    if (matches.length === 3) {
      console.log('Triple!');
      return [matches, [card1, card2], []];
    }
    return false;
  },

  function ppuk(card1, card2, field) {
    const matches = [];
    if (card1.slice(0, 3) === card2.slice(0, 3)) {
      field.forEach((cardId) => {
        if (card1.slice(0, 3) === cardId.slice(0, 3)) {
          matches.push(cardId);
        }
      });
      if (matches.length === 1) {
        console.log('Ppuk!');
        return [[], [], [card1, card2]];
      }
    }
    return false;
  },

  function chok(card1, card2, field) {
    const matches = [];
    if (card1.slice(0, 3) === card2.slice(0, 3)) {
      field.forEach((cardId) => {
        if (card1.slice(0, 3) === cardId.slice(0, 3)) {
          matches.push(cardId);
        }
      });
      if (matches.length === 0) {
        console.log('Chok!');
        return [[], [card1, card2], []];
      }
    }
    return false;
  },

  // const pairAvail = (card1, card2, field) => {
  //   const matches = [];
  //   field.forEach((card) => {
  //     if (card1.slice(0, 3) === card.month) {
  //       matches.push(fromField(card));
  //     }
  //   });
  //   if (matches.length === 2) {
  //     console.log('Two matches, pick one!')
  //     return matches;
  //   }
  //   return false;
  // };

  function basicMatch(card1, card2, field) {
    const matches = [];
    const playMatch = [];
    const cardsLeft = [card1, card2];
    const card1Match = singleMatch(card1, field);
    if (card1Match) {
      const [fieldM, playM] = card1Match;
      matches.push(fieldM);
      playMatch.push(playM);
      cardsLeft.shift();
    }
    const card2Match = singleMatch(card2, field);
    if (card2Match) {
      const [fieldM, playM] = card2Match;
      matches.push(fieldM);
      playMatch.push(playM);
      cardsLeft.pop();
    }
    if (matches.length === 2) {
      console.log('Match!');
    }
    if (matches.length === 4) {
      console.log('Two matches');
    }
    return [matches, playMatch, cardsLeft];
  },
];

export { logicChain };
