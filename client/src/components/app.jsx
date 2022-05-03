import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import OppCapture from './OppCapture.jsx';
import OppHand from './OppHand.jsx';
import Field from './Field.jsx';
import PlayerHand from './PlayerHand.jsx';
import PlayerCapture from './PlayerCapture.jsx';

const Board = styled.main`
  width: 90%;
  height: 900px;

  border: 2px solid #000000;

  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;
`;

const testHand = [
  {
    cardId: 'jank',
    cardMonth: 1,
  },
  {
    cardId: 'jant',
    cardMonth: 1,
  },
  {
    cardId: 'aprt',
    cardMonth: 4,
  },
  {
    cardId: 'nov2',
    cardMonth: 11,
  },
  {
    cardId: 'octy',
    cardMonth: 10,
  },
]

// Will receive both player's scores and card layouts with every card play
function App() {
  const [hand, setHand] = useState(testHand);

  return (
    <Board>
      <OppCapture />
      <OppHand />
      <Field />
      <PlayerHand hand={hand} />
      <PlayerCapture />
    </Board>
  );
}

export default App;
