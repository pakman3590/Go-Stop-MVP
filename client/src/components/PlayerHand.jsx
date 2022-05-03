import React from 'react';
import styled from 'styled-components';

const Hand = styled.div`
  height: 10%;
  width: 90%;

  border: 2px solid #000000;
`;

function PlayerHand(props) {
  return (
    <Hand>
      Player Hand
    </Hand>
  );
}

export default PlayerHand;
