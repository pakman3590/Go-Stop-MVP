const { dummy } = require('./dummydb');

module.exports = {
  getPlayerStates(gameId, playerId) {
    const {
      curr, player1, player2, field,
    } = dummy[gameId];
    if (playerId === 1) {
      return {
        curr,
        player: player1,
        opp: {
          cards: player2.hand,
          captured: player2.captured,
          points: player2.points,
        },
        field,
      };
    }
    return {
      curr,
      player: player2,
      opp: {
        cards: player1.hand,
        captured: player1.captured,
        points: player1.points,
      },
      field,
    };
  },
};
