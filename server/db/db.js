const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/gostop');

const gameSchema = new mongoose.Schema({
  curr: Number,
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
});

const Game = mongoose.model('Game', gameSchema);

exports.Game = Game;
