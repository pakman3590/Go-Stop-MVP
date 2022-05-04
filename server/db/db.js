const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/gostop');

const gameSchema = new mongoose.Schema({
  player1: {
    hand: Array,
    captured: Array,
    points: Number,
  },
  player2: {
    hand: Array,
    captured: Array,
    points: Number,
  },
  field: Array,
  deck: Array,
  turn: Number,
});

const Game = mongoose.model('Game', gameSchema);

exports.Game = Game;
