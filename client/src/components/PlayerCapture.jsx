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
      {cards.map((cardId) => (
        <Card
          key={cardId}
          cardIdProp={cardId}
          flipProp={true}
        />
      ))}
    </Capture>
  );
}

export default PlayerCapture;
