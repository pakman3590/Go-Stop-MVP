/* eslint-disable prefer-destructuring */
import { logicChain } from './gameLogic';

const updateHand = (hand, handUpdate) => {
  const newHand = hand.slice();
  const rmIndex = newHand.indexOf(handUpdate);
  newHand.splice(rmIndex, 1);
  return newHand;
};

const updateCapture = (capture, captureUpdate) => {
  let newCapture = capture.slice();
  newCapture = [...newCapture, ...captureUpdate];
  return newCapture;
};

const updateField = (field, fieldRm, fieldAdd) => {
  let newField = field.slice();
  fieldRm.forEach((cardId) => {
    const rmIndex = newField.indexOf(cardId);
    newField.splice(rmIndex, 1);
  });
  newField = [...newField, ...fieldAdd];
  return newField;
};

const dealCards = (deck) => {
  const newDeck = deck.slice();
  const p1Hand = newDeck.splice(0, 5);
  const p2Hand = newDeck.splice(0, 5);
  const field = newDeck.splice(0, 4);
  p1Hand.push(...newDeck.splice(0, 4));
  p2Hand.push(...newDeck.splice(0, 4));
  field.push(...newDeck.splice(0, 4));
  return [p1Hand, p2Hand, field, newDeck];
};

const drawCard = (deck) => {
  const newDeck = deck.slice();
  return [newDeck.splice(0, 1), newDeck];
};

const playCard = (playedCardId, field, deck) => {
  const [drawnCard, newDeck] = drawCard(deck);
  console.log(`Played: ${playedCardId}, Drew: ${drawnCard}`);
  const update = {
    fMatch: [],
    pMatch: [],
    addField: [],
    specialEvent: false,
    newDeck,
  };
  for (let i = 0; i < 5; i += 1) {
    const result = logicChain[i](playedCardId, ...drawnCard, field);
    if (result) {
      console.log(`Success! ${i}`);
      if (i === 0 || i === 1 || i === 3) {
        update.specialEvent = true;
      }
      update.fMatch = result[0];
      update.pMatch = result[1];
      update.addField = result[2];
      break;
    }
  }
  return update;
};

export {
  updateHand, updateField, updateCapture, dealCards, playCard,
};
