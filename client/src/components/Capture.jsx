import React from 'react';
import styled from 'styled-components';

import Card from './Card.jsx';
import { cardScore } from '../scoring';

const ContainerDiv = styled.div`
  height: 25%;
  width: 90%;

  display: flex;

  border: 2px solid #000000;
`;

const CaptureDiv = styled.div`
  height: 100%;
  width: 85%;

  display: flex;
  flex-flow: row wrap;
`;

const Score = styled.div`
  height 100%;
  width: 15%;
`;

function Capture(props) {
  const { cards } = props;
  return (
    <ContainerDiv>
      <CaptureDiv>
        {cards.map((cardId) => (
          <Card
            key={cardId}
            cardIdProp={cardId}
            flipProp={true}
          />
        ))}
      </CaptureDiv>
      <Score>
        Score:
        {cardScore(cards)[0]}
      </Score>
    </ContainerDiv>
  );
}

export default Capture;
