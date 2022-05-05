import React from 'react';
import styled from 'styled-components';

import Card from './Card.jsx';

const Hand = styled.div`
  height: 10%;
  width: 90%;

  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const randId = () => Math.floor(Math.random() * 100000);

function OppHand(props) {
  const { hand } = props;

  return (
    <Hand>
      {hand.map(() => <Card key={randId()} flipped={false} />)}
    </Hand>
  );
}

export default OppHand;
