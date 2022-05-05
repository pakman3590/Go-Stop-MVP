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

  display: flex;
  flex-direction: column:

  justify-content: space-evenly;
  align-items: center;
`;

function OppCapt(props) {
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
        <h4>Score:</h4>
        <span>{cardScore(cards)[0]}</span>
        <span> </span>
      </Score>
    </ContainerDiv>
  );
}

export default OppCapt;
