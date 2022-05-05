import React from 'react';
import styled from 'styled-components';

import Card from './Card.jsx';
// import { cardScore } from '../scoring';

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

`;

function Capture(props) {
  const { cards, points, turn } = props;

  const turns = () => {
    if (turn % 2 !== 0) {
      return <span>Your Turn!</span>;
    }
    return <span>{'Opponent\'s Turn!'}</span>;
  };

  // const score = () => {
  //   const newScore = cardScore(cards)[0];
  //   if (newScore >= 7) {
  //     alert ()
  //   }
  // }

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
        <span>{points}</span>
        {turns()}
      </Score>
    </ContainerDiv>
  );
}

export default Capture;
