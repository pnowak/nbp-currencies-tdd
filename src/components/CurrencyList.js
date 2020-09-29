import React from 'react';
import Currency from './Currency';

export const CurrencyList = ({ buttonValue, currencies, handleClick }) => {
  return (
    <div id="currencyList">
      <ol>
        {currencies.map(currency => (
          <li key={currency.code}>
            <Currency
              buttonValue={buttonValue}
              handleClick={handleClick}
              rate={currency}
            />
          </li>
        ))}
      </ol>
    </div>
  );
};