import React from 'react';
import styled from 'styled-components';
// eslint-disable-next-line no-unused-vars
import regeneratorRuntime from 'regenerator-runtime';

import { newGame, fetchState, updateGame } from '../requests';
import {
  updateHand, updateField, updateCapture, dealCards, playCard,
} from '../gameMechanics';

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

// const wait = async (time) => (
//   new Promise((resolve) => { setTimeout(resolve, time); })
// );

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
      oppHand: [],
      oppCapture: [],
      field: [],
      deck: null,
      turn: 1,
    };

    this.startNewGame = this.startNewGame.bind(this);
    this.handleCardClick = this.handleCardClick.bind(this);
    this.dumbAi = this.dumbAi.bind(this);
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
    const { oppHand } = this.state;
    console.log('Opponent is thinking');
    const randomCard = oppHand[Math.floor(Math.random() * (oppHand.length - 1))];
    // this.setState({
    //   last: 1,
    // });
    await setTimeout(() => {
      console.log(`opp plays ${randomCard}`);
      this.handleCardClick(randomCard, 2);
    }, 4000);
  }

  handleCardClick(cardId, playerId) {
    const {
      playerHand, playerCapture, oppHand, oppCapture, field, deck, turn,
    } = this.state;

    let current = {
      hand: playerHand,
      handN: 'playerHand',
      capture: playerCapture,
      captureN: 'playerCapture',
    };
    if (playerId === 2) {
      current = {
        hand: oppHand,
        handN: 'oppHand',
        capture: oppCapture,
        captureN: 'oppCapture',
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

    this.setState({
      [current.handN]: newHand,
      [current.captureN]: newCapture,
      field: newField,
      deck: newDeck,
      turn: turn + 1,
    }, () => {
      updateGame(this.state)
        .then(() => console.log('Game Updated!'))
        .catch((err) => console.log(err));
    });
  }

  render() {
    const {
      active, playerHand, playerCapture, oppHand, oppCapture, field,
    } = this.state;
    console.log(this.state);

    const renderGame = () => {
      if (active) {
        return (
          <Board>
            <Capture cards={oppCapture} />
            <OppHand hand={oppHand} />
            <Field field={field} />
            <PlayerHand
              hand={playerHand}
              handleCardClick={this.handleCardClick}
            />
            <Capture cards={playerCapture} />
          </Board>
        );
      }
      return (
        <Board>Loading...</Board>
      );
    };

    return (
      renderGame()
    );
  }
}

export default App;

// Will receive both player's scores and card layouts with every card play
// function App() {
//   const [active, setActive] = useState(null);
//   const [timer, setTimer] = useState(false);
//   const [gameId, setGameId] = useState(null);
//   const [playerId, setPlayerId] = useState(null);
//   const [playerHand, setPlayerHand] = useState([]);
//   const [playerCapture, setPlayerCapture] = useState([]);
//   const [oppHand, setOppHand] = useState([]);
//   const [oppCapture, setOppCapture] = useState([]);
//   const [fieldState, setFieldState] = useState([]);
//   const [deck, setDeck] = useState(null);

//   const startNewGame = () => {
//     newGame()
//       .then((response) => {
//         setGameId(response.data.gameId);
//         setPlayerId(1);
//         setDeck(response.data.deck);
//         setActive(true);
//       })
//       .then(() => {
//         setInterval(() => console.log(deck), 500);
//         // const { p1Hand, p2Hand, newDeck } = dealCards(deck);
//         // await setTimeout(() => setPlayerHand(p1Hand), 500);
//         // await setTimeout(() => setOppHand(p2Hand), 500);
//         // setDeck(newDeck);
//       })
//       .catch((err) => console.log(err));
//   };

//   const gameRefresh = () => {
//     console.log('refreshing game')
//     setTimeout(() => {
//       fetchState(gameId, playerId)
//         .then((response) => {
//           const {
//             curr, player, opp, field, newDeck,
//           } = response.data;
//           console.log(curr, playerId);
//           if (curr !== playerId) {
//             setPlayerHand(player.hand);
//             setPlayerCapture(player.captured);
//             setOppHand(opp.hand);
//             setOppCapture(opp.captured);
//             setFieldState(field);
//             setDeck(newDeck);
//           }
//         }).then(() => {
//           gameRefresh();
//         })
//         .catch((err) => console.log(err));
//     }, 5000);
//   };

//   // const gameLoad = () => {
//   //   console.log('loading game');
//   //   fetchState(gameId, playerId)
//   //     .then((response) => {
//   //       const {
//   //         player, opp, field, newDeck,
//   //       } = response.data;
//   //       setPlayerHand(player.hand);
//   //       setPlayerCapture(player.captured);
//   //       setOppHand(opp.hand);
//   //       setOppCapture(opp.captured);
//   //       setFieldState(field);
//   //       setDeck(newDeck);
//   //     }).then(() => {
//   //       setActive(true);
//   //       gameRefresh();
//   //     })
//   //     .catch((err) => console.log(err));
//   // };

//   // useEffect(gameLoad, []);
//   // useEffect(() => {
//   //   if (gameId && playerId) {
//   //     gameRefresh();
//   //   }
//   // }, [timer, gameId, playerId]);

//   const handleCardClick = async (cardId) => {
//     console.log(`clicked ${cardId}`);
//     const index = playerHand.indexOf(cardId);
//     const newHand = playerHand.slice();
//     newHand.splice(index, 1);
//     setPlayerHand(newHand);
//     setFieldState([...fieldState, cardId]);
//     const cardMonth = cardId.slice(0, 3);
//     await setTimeout(() => {}, 500);
//     fieldState.forEach((fieldCardId, fieldIndex) => {
//       if (cardMonth === fieldCardId.slice(0, 3)) {
//         const newField = fieldState.slice();
//         newField.splice(fieldIndex, 1);
//         setFieldState(newField);
//         setPlayerCapture([...playerCapture, cardId, fieldCardId]);
//       }
//     });
//     dumbAi();
//   };

//   const handleIdChange = (e) => {
//     setGameId(e.target.value);
//   };

//   const handlePlayerChange = (e) => {
//     setPlayerId(e.target.value);
//   };

//   // REMOVE WHEN MULTIPLAYER IMPLEMENTED

// const handleOpp = async (cardId) => {
//   const index = oppHand.indexOf(cardId);
//   const newHand = oppHand.slice();
//   newHand.splice(index, 1);
//   setOppHand(newHand);
//   setFieldState([...fieldState, cardId]);
//   const cardMonth = cardId.slice(0, 3);
//   await setTimeout(() => {}, 500);
//   fieldState.forEach((fieldCardId, fieldIndex) => {
//     if (cardMonth === fieldCardId.slice(0, 3)) {
//       const newField = fieldState.slice();
//       newField.splice(fieldIndex, 1);
//       setFieldState(newField);
//       setOppCapture([...oppCapture, cardId, fieldCardId]);
//     }
//   });
// };

// const dumbAi = async () => {
//   console.log('Opponent is thinking');
//   const randomCard = oppHand[Math.floor(Math.random() * (oppHand.length - 1))];
//   await setTimeout(() => {
//     console.log(`opp plays ${randomCard}`);
//     handleOpp(randomCard);
//   }, 4000);
// };

//   // REMOVE WHEN MULTIPLAYER IMPLEMENTED

//   if (active) {
//     return (
// <Board>
//   <Capture cards={oppCapture} />
//   <OppHand hand={oppHand} />
//   <Field field={fieldState} />
//   <PlayerHand
//     hand={playerHand}
//     handleCardClick={handleCardClick}
//   />
//   <Capture cards={playerCapture} />
// </Board>
//     );
//   }

//   return (
//     <Board>
//       <button onClick={() => {
//         startNewGame();
//       }
//       }>NEW GAM</button>
//       {/* <form>
//         <input
//           type='text'
//           value={gameId}
//           onChange={handleIdChange}
//         />
//         <input
//           type='text'
//           value={playerId}
//           onChange={handlePlayerChange}
//         />
//         <button type='submit'>GAM</button>
//       </form> */}
//     </Board>
//   );
// }
