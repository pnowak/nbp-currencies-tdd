import React from 'react';

const Error = () => (
  <div className="error">An error occurred during save.</div>
);

const Loading = () => (
  <div>Loading...</div>
);

export const Currency = ({ buttonValue, rate }) => (
  <>
    <span>{rate.currency}</span>
    <button type="button">{buttonValue}</button>
  </>
);

export const CurrencyList = ({ buttonValue, currencies, error, isLoading }) => {
  return (
    <div id="currencyList">
      {error ? <Error /> : null}
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