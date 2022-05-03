import axios from 'axios';

const fetchState = (gameId, playerId) => {
  console.log('fetching game state');
  return axios.get(`/fetch/${gameId}/${playerId}`);
};

export default fetchState;
