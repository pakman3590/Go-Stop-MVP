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
        {field.map((cardId) => (
        <Card
          key={cardId}
          cardIdProp={cardId}
          flipProp={true}
          hand={false}
        />
        ))}
      <div>Deck</div>
    </FieldDiv>
  );
}

export default Field;
