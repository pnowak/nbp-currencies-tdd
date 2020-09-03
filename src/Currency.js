import React from 'react';

const Loading = () => (
  <div>Loading...</div>
);

export const Currency = ({ buttonValue, rate }) => (
  <>
    <span>{rate.currency}</span>
    <button type="button">{buttonValue}</button>
  </>
);

export const CurrencyList = ({ buttonValue, currencies, isLoading }) => {
  return (
    <div id="currencyList">
      {isLoading ? (
        <Loading />
      ) : (
        <ol>
          {currencies.map(currency => (
            <li key={currency.code}>
              <Currency rate={currency} buttonValue={buttonValue} />
            </li>
          ))}
        </ol>
      )}
    </div>
  );
};

export const FavouriteList = () => <div id="favouriteList"></div>