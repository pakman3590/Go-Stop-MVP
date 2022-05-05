import React from 'react';
import styled from 'styled-components';
import { sortCapture } from '../gameMechanics';

import Card from './Card.jsx';

const ContainerDiv = styled.div`
  height: 25%;
  width: 90%;

  display: flex;
`;

const CaptureDiv = styled.div`
  height: 100%;
  width: 85%;

  display: flex;
  flex-flow: row wrap;
`;

const CardSection = styled.div`
  width: max-content;
  padding-right: 70px;

  display: grid;
  grid-template-columns: repeat(5, 25px);
  grid-template-rows: repeat(3, 60px);
`;

const Score = styled.div`
  height 100%;
  width: 15%;

  display: flex;
  flex-direction: column;

  justify-content: space-evenly;
  align-items: center;
`;

function Capture(props) {
  const { cards, points, turn } = props;

  const turns = () => {
    if (turn % 2 !== 0) {
      return <span>Your Turn!</span>;
    }
    return <span>{'Opponent\'s Turn!'}</span>;
  };

  const sortedCapture = () => {
    const {
      kwang, ribbon, animal, pi,
    } = sortCapture(cards);
    return (
      <CaptureDiv>
        <CardSection>
          {kwang.map((cardId) => (
            <Card
              key={cardId}
              cardIdProp={cardId}
              flipProp={true}
            />
          ))}
        </CardSection>
        <CardSection>
          {ribbon.map((cardId) => (
            <Card
              key={cardId}
              cardIdProp={cardId}
              flipProp={true}
            />
          ))}
        </CardSection>
        <CardSection>
          {animal.map((cardId) => (
            <Card
              key={cardId}
              cardIdProp={cardId}
              flipProp={true}
            />
          ))}
        </CardSection>
        <CardSection>
          {pi.map((cardId) => (
            <Card
              key={cardId}
              cardIdProp={cardId}
              flipProp={true}
            />
          ))}
        </CardSection>
      </CaptureDiv>
    );
  };

  return (
    <ContainerDiv>
      {/* <CaptureDiv>
        {cards.map((cardId) => (
          <Card
            key={cardId}
            cardIdProp={cardId}
            flipProp={true}
          />
        ))}
      </CaptureDiv> */}
      {sortedCapture()}
      <Score>
        <h4>{`Score: ${points}`}</h4>
        {turns()}
      </Score>
    </ContainerDiv>
  );
}

export default Capture;
