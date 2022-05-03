const { dummy } = require('./dummydb');

module.exports = {
  getPlayerStates(gameId, playerId) {
    const { player1, player2, field } = dummy[gameId];
    if (playerId === 1) {
      return {
        player: player1,
        opp: {
          cards: player2.hand.length,
          captured: player2.captured,
          points: player2.points,
        },
        field,
      };
    }
    return {
      player: player2,
      opp: {
        cards: player1.hand.length,
        captured: player1.captured,
        points: player1.points,
      },
      field,
    };
  },
};
