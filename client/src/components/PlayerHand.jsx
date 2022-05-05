import React from 'react';
import styled from 'styled-components';

import HandCard from './HandCard.jsx';

const Hand = styled.div`
  height: 10%;
  width: 90%;

  display: flex;
  flex-direction: row;
  justify-content: center;

  border: 2px solid #000000;
`;

function PlayerHand(props) {
  const { hand, handleCardClick, turn } = props;

  return (
    <Hand>
      {hand.map((cardId) => (
        <HandCard
        key={cardId}
        turn={turn}
        cardId={cardId}
        handleCardClick={handleCardClick}
        />
      ))}
    </Hand>
  );
}

export default PlayerHand;
