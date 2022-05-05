import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const CardDiv = styled.div`
  height: 93px;
  width: 60px;
  z-index: 1;
  margin: 0 5px 0 5px;

  background-color: #FF0000;

  border: 2px solid #000000;
  border-radius: 5px;
`;

function HandCard(props) {
  const { cardId, handleCardClick, turn } = props;

  return (
    <CardDiv onClick={() => {
      if (turn % 2 !== 0) {
        handleCardClick(cardId);
      }
    }} >
      <img src={`https://www.pagat.com/images/hwatu/${cardId}.gif`} />
    </CardDiv>
  );
}

export default HandCard;
