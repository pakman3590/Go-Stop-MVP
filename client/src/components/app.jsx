import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import regeneratorRuntime from 'regenerator-runtime';

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
    console.log('refreshing game')
    setTimeout(() => {
      fetchState(gameId, playerId)
        .then((response) => {
          const {
            curr, player, opp, field,
          } = response.data;
          console.log(curr, playerId);
          if (curr !== playerId) {
            setPlayerHand(player.hand);
            setPlayerCapture(player.captured);
            setOppHand(opp.cards);
            setOppCapture(opp.captured);
            setFieldState(field);
          }
        }).then(() => {
          setTimer(!timer);
        })
        .catch((err) => console.log(err));
    }, 5000);
  };

  const gameLoad = () => {
    console.log('loading game')
    fetchState(gameId, playerId)
      .then((response) => {
        const {
          player, opp, field,
        } = response.data;
        setPlayerHand(player.hand);
        setPlayerCapture(player.captured);
        setOppHand(opp.cards);
        setOppCapture(opp.captured);
        setFieldState(field);
      }).then(() => {
        setActive(true);
        gameRefresh();
      })
      .catch((err) => console.log(err));
  };

  useEffect(gameLoad, []);
  useEffect(gameRefresh, [timer]);

  const handleCardClick = async (cardId) => {
    console.log(`clicked ${cardId}`);
    const index = playerHand.indexOf(cardId);
    const newHand = playerHand.slice();
    newHand.splice(index, 1);
    setPlayerHand(newHand);
    setFieldState([...fieldState, cardId]);
    const cardMonth = cardId.slice(0, 3);
    await setTimeout(() => {}, 500);
    fieldState.forEach((fieldCardId, fieldIndex) => {
      if (cardMonth === fieldCardId.slice(0, 3)) {
        const newField = fieldState.slice();
        newField.splice(fieldIndex, 1);
        setFieldState(newField);
        setPlayerCapture([...playerCapture, cardId, fieldCardId]);
      }
    });
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
