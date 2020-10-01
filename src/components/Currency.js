import React from 'react';

export const Currency = ({ buttonValue, handleClick, rate }) => (
  <>
    <span>{rate.currency}</span>
    <button
      type="button"
      onClick={() => handleClick(rate)}
      disabled={rate.isInFauvorite}
    >
      {buttonValue}
    </button>
  </>
);