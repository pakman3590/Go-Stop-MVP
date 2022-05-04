const express = require('express');
const path = require('path');

const { getPlayerStates } = require('./requests');
const { shuffleDeck } = require('./deck');
const { Game } = require('./db/db');

const app = express();

const PORT = 3000;

app.use(express.json());
app.use('*', (req, res, next) => {
  console.log(`${req.method} at ${req.path}`);
  next();
});
app.use(express.static(path.resolve(__dirname, '../client/dist')));

app.get('/new', (req, res) => {
  console.log('generating new game!');
  // generate random deck
  const newDeck = shuffleDeck();
  // send deck to dbms for new full game
  const newGame = new Game({
    player1: {
      hand: [],
      captured: [],
      points: 0,
    },
    player2: {
      hand: [],
      captured: [],
      points: 0,
    },
    field: [],
    deck: newDeck,
    turn: 1,
  });
  newGame.save()
    .then((response) => {
      // eslint-disable-next-line dot-notation
      console.log(`new game ID ${response['_id']} created!`);
      res.send(getPlayerStates(1, response));
    });
});

app.get('/:gameId/:playerId', (req, res) => {
  const { gameId, playerId } = req.params;
  console.log(`Fetching game ${gameId} for player ${playerId}!`);
  Game.findOne({ _id: gameId }, (err, results) => {
    if (err) {
      console.log(err);
      res.sendStatus(404);
    } else {
      res.send(getPlayerStates(playerId, results));
    }
  });
});

app.put('/:gameId', (req, res) => {
  const { gameId } = req.params;
  const { turn } = req.data;
  console.log(`Updating game ${gameId} turn ${turn}`);
  Game.findOneAndUpdate({ _id: gameId }, req.data, (err) => {
    if (err) {
      console.log(err);
      res.sendStatus(404);
    } else {
      res.sendStatus(200);
    }
  });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
