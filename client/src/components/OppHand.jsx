import React from 'react';
import styled from 'styled-components';

const Hand = styled.div`
  height: 10%;
  width: 90%;

  border: 2px solid #000000;
`;

function OppHand(props) {
  return (
    <Hand>
      Opp Hand
    </Hand>
  );
}

export default OppHand;
