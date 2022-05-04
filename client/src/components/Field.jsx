import React from 'react';
import styled from 'styled-components';
import Card from './Card.jsx';

const CenterDiv = styled.div`
  height: 30%;
  width: 90%;

  display: flex;
  flex-direction: row;

  border: 2px solid #000000;
`;

const FieldDiv = styled.div`
  height: 100%;
  width: 80%;

  align-items: center;
  display: flex;
  flex-flow: row wrap;
`;

const DeckDiv = styled.div`
  height: 100%;
  width: 20%;

  align-items: center;
  justify-items: center;
`;

function Field(props) {
  const { field } = props;
  return (
    <CenterDiv>
      <FieldDiv>
          {field.map((cardId) => (
          <Card
            key={cardId}
            cardIdProp={cardId}
            flipProp={true}
            hand={false}
          />
          ))}
      </FieldDiv>
      <DeckDiv>
        <Card
          flipProp={false}
          hand={false}
        />
      </DeckDiv>
    </CenterDiv>
  );
}

export default Field;
