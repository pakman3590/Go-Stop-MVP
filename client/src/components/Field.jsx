import React from 'react';
import styled from 'styled-components';
import Card from './Card.jsx';

const FieldDiv = styled.div`
  height: 30%;
  width: 90%;

  border: 2px solid #000000;

  display: flex;
  flex-direction: row;
`;

function Field(props) {
  const { field } = props;
  return (
    <FieldDiv>
      <div>Playing Field</div>
        {field.map((card) => (
        <Card
          key={card.cardId}
          cardIdProp={card.cardId}
          cardMonthProp={card.cardMonth}
          flipProp={true}
          hand={false}
        />
        ))}
      <div>Deck</div>
    </FieldDiv>
  );
}

export default Field;
