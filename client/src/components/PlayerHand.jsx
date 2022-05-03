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
  const { hand, handleCardClick } = props;

  console.log(hand)

  return (
    <Hand>
      {hand.map((card) => {
        const { cardId, cardMonth } = card;
        return <HandCard
        key={cardId}
        cardId={cardId}
        cardMonth={cardMonth}
        handleCardClick={handleCardClick}
        />;
      })}
    </Hand>
  );
}

export default PlayerHand;
