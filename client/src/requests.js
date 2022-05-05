import axios from 'axios';

const newGame = () => {
  console.log('initializing new game');
  return axios.get('/new');
};

const fetchState = (gameId, playerId) => {
  console.log(`fetching state for game ${gameId}: player ${playerId}`);
  return axios.get(`/${gameId}/${playerId}`);
};

const updateGame = (state) => {
  console.log('updating!');
  const {
    gameId, playerHand, playerCapture, oppHand, oppCapture, field, deck, turn,
  } = state;
  const data = {
    player1: {
      hand: playerHand,
      captured: playerCapture,
      // NEEDS POINTS
    },
    player2: {
      hand: oppHand,
      captured: oppCapture,
      // NEEDS POINTS
    },
    field,
    deck,
    turn,
  };

  return axios.put(`/${gameId}`, data);
};

export { newGame, fetchState, updateGame };
