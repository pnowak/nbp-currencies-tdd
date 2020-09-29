import React from 'react';

export const Currency = ({ buttonValue, handleClick, rate }) => (
  <>
    <span>{rate.currency}</span>
    <button
      type="button"
      onClick={event => handleClick(event, rate)}
      disabled={rate.isInFauvorite}
    >
      {buttonValue}
    </button>
  </>
);