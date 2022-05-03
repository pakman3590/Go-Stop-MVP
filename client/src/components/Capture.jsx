import React from 'react';
import styled from 'styled-components';

import Card from './Card.jsx';

const CaptureDiv = styled.div`
  height: 25%;
  width: 90%;

  border: 2px solid #000000;
`;

function Capture(props) {
  const { cards } = props;
  return (
    <CaptureDiv>
      {cards.map((card) => (
        <Card
          key={card.cardId}
          cardIdProp={card.cardId}
          cardMonthProp={card.cardMonth}
          flipProp={true}
        />
      ))}
    </CaptureDiv>
  );
}

export default Capture;
