import axios from 'axios';

const newGame = () => {
  console.log('initializing new game');
  return axios.get('/new');
};

const fetchState = (gameId, playerId) => {
  console.log(`fetching state for game ${gameId}: player ${playerId}`);
  return axios.get(`/${gameId}/${playerId}`);
};

// const playCard = (gameId, playerId, cardId) => {
//   console.log(`playing card ${cardId}`);
//   return axios.put(`/${gameId}/${playerId}/play`, { cardId });
// };

export { newGame, fetchState };
