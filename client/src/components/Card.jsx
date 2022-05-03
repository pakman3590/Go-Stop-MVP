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

function Card(props) {
  const { cardIdProp, cardMonthProp, flipProp, hand } = props;

  const [flipped, setFlipped] = useState(flipProp);
  const [inHand, setInHand] = useState(hand);
  const [cardMonth, setCardMonth] = useState(cardMonthProp);

  if (flipped) {
    return (
      <CardDiv>
        <img src={`https://www.pagat.com/images/hwatu/${cardIdProp}.gif`} />
      </CardDiv>
    );
  }
  return (
      <CardDiv>
      </CardDiv>
  );
}

export default Card;
