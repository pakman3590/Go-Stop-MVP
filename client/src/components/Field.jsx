import React from 'react';
import styled from 'styled-components';
import Card from './Card.jsx';

import { fromField } from '../gameLogic';

const CenterDiv = styled.div`
  height: 20%;
  width: 90%;

  display: flex;
  flex-direction: row;
`;

const FieldDiv = styled.div`
  height: 100%;
  width: 90%;

  align-items: center;
  display: flex;
  flex-flow: row wrap;
`;

const DeckDiv = styled.div`
  height: 100%;
  width: 10%;

  display: flex;

  align-items: center;
  justify-items: flex-end;
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
