import React from 'react';
import styled from 'styled-components';

const Capture = styled.div`
  height: 25%;
  width: 90%;

  border: 2px solid #000000;
`;

function PlayerCapture(props) {
  const { cards } = props;
  return (
    <Capture>
      {cards.map((card) => (
        <Card
          key={card.cardId}
          cardIdProp={card.cardId}
          cardMonthProp={card.cardMonth}
          flipProp={true}
        />
      ))}
    </Capture>
  );
}

export default PlayerCapture;
