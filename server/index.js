const express = require('express');
const path = require('path');

const { getPlayerStates } = require('./requests');

const app = express();

const PORT = 3000;

app.use(express.json());
app.use('*', (req, res, next) => {
  console.log(`${req.method} at ${req.path}`);
  next();
});
app.use(express.static(path.resolve(__dirname, '../client/dist')));

app.get('/:gameId/:playerId', (req, res) => {
  const { gameId, playerId } = req.params;
  console.log(`Fetching game ${gameId} for player ${playerId}!`);
  res.send(getPlayerStates(gameId, playerId));
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
