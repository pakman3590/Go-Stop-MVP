import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import fetchState from '../requests';

import Capture from './Capture.jsx';
import OppHand from './OppHand.jsx';
import Field from './Field.jsx';
import PlayerHand from './PlayerHand.jsx';

const Board = styled.main`
  width: 90%;
  height: 900px;

  border: 2px solid #000000;

  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;
`;

// Will receive both player's scores and card layouts with every card play
function App() {
  const [active, setActive] = useState(false);
  const [timer, setTimer] = useState(false);
  const [gameId, setGameId] = useState(56);
  const [playerId, setPlayerId] = useState(1);
  const [playerHand, setPlayerHand] = useState(null);
  const [playerCapture, setPlayerCapture] = useState(null);
  const [oppHand, setOppHand] = useState(null);
  const [oppCapture, setOppCapture] = useState(null);
  const [fieldState, setFieldState] = useState(null);

  const gameRefresh = () => {
    setTimeout(() => {
      fetchState(gameId, playerId)
        .then((response) => {
          const { player, opp, field } = response.data;
          setPlayerHand(player.hand);
          setPlayerCapture(player.captured);
          setOppHand(opp.cards);
          setOppCapture(opp.captured);
          setFieldState(field);
        }).then(() => {
          if (!active) {
            setActive(true);
          }
          setTimer(!timer);
        })
        .catch((err) => console.log(err));
    }, 5000);
  };

  useEffect(gameRefresh, [timer, gameId, playerId]);

  const handleCardClick = (cardId, cardMonth) => {
    // PUT REQUEST TO SERVER
  };

  if (active) {
    return (
      <Board>
        <Capture cards={oppCapture} />
        <OppHand hand={Array(oppHand).fill(0)} />
        <Field field={fieldState} />
        <PlayerHand
          hand={playerHand}
          handleCardClick={handleCardClick}
        />
        <Capture cards={playerCapture} />
      </Board>
    );
  }

  return (
    <Board>
      <button>NewGame</button>
    </Board>
  );
}

export default App;
