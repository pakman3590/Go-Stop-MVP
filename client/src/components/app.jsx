import React from 'react';
import styled from 'styled-components';
// eslint-disable-next-line no-unused-vars
import regeneratorRuntime from 'regenerator-runtime';

import { newGame, fetchState, updateGame } from '../requests';
import {
  updateHand, updateField, updateCapture, dealCards, playCard,
} from '../gameMechanics';
import { cardScore } from '../scoring';

import PlayerCapt from './PlayerCapt.jsx';
import OppCapt from './OppCapt.jsx';
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

const GoStop = styled.dialog`
  z-index: 1;
`;

const NewGame = styled.dialog`
  z-index: 1;
`;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: null,
      timer: false,
      gameId: null,
      playerId: null,
      playerHand: [],
      playerCapture: [],
      playerPoints: 0,
      oppHand: [],
      oppCapture: [],
      oppPoints: 0,
      field: [],
      deck: null,
      turn: 1,
      winner: null,
    };

    this.startNewGame = this.startNewGame.bind(this);
    this.handleCardClick = this.handleCardClick.bind(this);
    this.dumbAi = this.dumbAi.bind(this);
    this.handleGoStop = this.handleGoStop.bind(this);
  }

  componentDidMount() {
    this.startNewGame();
  }

  startNewGame() {
    newGame()
      .then((response) => {
        const { gameId, deck } = response.data;
        this.setState({
          gameId,
          playerId: 1,
          deck,
          winner: null,
        }, () => {
          const [p1Hand, p2Hand, field, newDeck] = dealCards(deck);
          this.setState({
            playerHand: p1Hand,
            oppHand: p2Hand,
            field,
            deck: newDeck,
            active: true,
          });
        });
      });
  }

  async dumbAi() {
    const { oppHand, turn } = this.state;
    if (turn % 2 === 0) {
      console.log('Opponent is thinking');
      const randomCard = oppHand[Math.floor(Math.random() * (oppHand.length - 1))];
      await setTimeout(() => {
        console.log(`opp plays ${randomCard}`);
        this.handleCardClick(randomCard, 2);
      }, 4000);
    }
  }

  handleCardClick(cardId, playerId) {
    const {
      playerHand, playerCapture, playerPoints, oppHand, oppCapture, oppPoints, field, deck, turn,
    } = this.state;

    let current = {
      hand: playerHand,
      handN: 'playerHand',
      capture: playerCapture,
      captureN: 'playerCapture',
      points: playerPoints,
      pointsN: 'playerPoints',
    };
    if (playerId === 2) {
      current = {
        hand: oppHand,
        handN: 'oppHand',
        capture: oppCapture,
        captureN: 'oppCapture',
        points: oppPoints,
        pointsN: 'oppPoints',
      };
    }
    console.log(`clicked ${cardId}`);

    const handUpdate = cardId;
    const {
      fMatch, pMatch, addField, specialEvent, newDeck,
    } = playCard(cardId, field, deck);

    const newHand = updateHand(current.hand, handUpdate);
    const newCapture = updateCapture(current.capture, [...fMatch, ...pMatch]);
    const newField = updateField(field, fMatch, addField);
    const newPoints = cardScore(newCapture)[0];

    this.setState({
      [current.handN]: newHand,
      [current.captureN]: newCapture,
      [current.pointsN]: newPoints,
      field: newField,
      deck: newDeck,
      turn: turn + 1,
    }, () => {
      updateGame(this.state)
        .then(() => console.log('Game Updated!'))
        .then(() => this.dumbAi())
        .catch((err) => console.log(err));
    });
  }

  handleGoStop(choice) {
    if (choice) {
      // DO SOMETHING
    } else {
      this.setState({
        winner: 'player1',
      });
    }
  }

  render() {
    const {
      active,
      playerId, playerHand, playerCapture, playerPoints,
      oppHand, oppCapture, oppPoints,
      field, turn, winner,
    } = this.state;

    const goStopDiag = () => {
      if (playerPoints >= 1) {
        return (
          <GoStop open>
            <p>{`You have ${playerPoints} points!
            Go or Stop?`}</p>
            <form method="dialog">
              <button>GO</button>
              <button onClick={() => this.handleGoStop(false)}>STOP</button>
            </form>
          </GoStop>
        );
      }
      return <dialog></dialog>;
    };

    const endGameDiag = () => {
      if (winner) {
        return (
          <NewGame open>
            <p>You Win!</p>
            <button onClick={this.startNewGame}>New Game</button>
          </NewGame>
        );
      }
      return <dialog></dialog>;
    };

    const renderGame = () => {
      if (active) {
        return (
          <Board>
            <OppCapt
              cards={oppCapture}
              points={oppPoints}
            />
            <OppHand hand={oppHand} />
            <Field field={field} />
            {goStopDiag()}
            {endGameDiag()}
            <PlayerHand
              hand={playerHand}
              handleCardClick={this.handleCardClick}
              turn={turn}
            />
            <PlayerCapt
              playerId={playerId}
              points={playerPoints}
              cards={playerCapture}
              turn={turn}
            />
          </Board>
        );
      }
      return (
        <Board>Loading...</Board>
      );
    };

    return (
      <div>
        {renderGame()}
      </div>
    );
  }
}

export default App;
