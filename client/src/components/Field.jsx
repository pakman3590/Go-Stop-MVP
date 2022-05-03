import React from 'react';
import styled from 'styled-components';

const FieldDiv = styled.div`
  height: 30%;
  width: 90%;

  border: 2px solid #000000;
`;

function Field(props) {
  return (
    <FieldDiv>
      Field
    </FieldDiv>
  );
}

export default Field;
