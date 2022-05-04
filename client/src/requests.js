import axios from 'axios';

const fetchState = (gameId, playerId) => {
  console.log(`fetching state for game ${gameId}: player ${playerId}`);
  return axios.get(`/${gameId}/${playerId}`);
};

const playCard = (gameId, playerId, cardId) => {
  console.log(`playing card ${cardId}`);
  return axios.put(`/${gameId}/${playerId}/play`, { cardId });
};

export default fetchState;
