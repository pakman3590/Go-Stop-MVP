module.exports = {
  getPlayerStates(playerId, game) {
    const {
      _id, curr, player1, player2, field, deck,
    } = game;
    if (playerId === 1) {
      return {
        gameId: _id,
        curr,
        player: player1,
        opp: {
          hand: player2.hand,
          captured: player2.captured,
          points: player2.points,
        },
        field,
        deck,
      };
    }
    return {
      gameId: _id,
      curr,
      player: player2,
      opp: {
        hand: player1.hand,
        captured: player1.captured,
        points: player1.points,
      },
      field,
      deck,
    };
  },
};
