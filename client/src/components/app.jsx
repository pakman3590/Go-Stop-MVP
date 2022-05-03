import React from 'react';
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

function App() {
  return (
    <Board>
      <OppCapture />
      <OppHand />
      <Field />
      <PlayerHand />
      <PlayerCapture />
    </Board>
  );
}

export default App;
