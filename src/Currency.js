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

export const CurrencyList = ({ buttonValue, currencies }) => {
  return (
    <div id="currencyList">
      <ol>
        {currencies.map(currency => (
          <li key={currency.code}>
            <Currency
              buttonValue={buttonValue}
              rate={currency}
            />
          </li>
        ))}
      </ol>
    </div>
  );
};

export const FavouriteList = ({buttonValue, favourites}) => {
  return (
    <div id="favouriteList">
      <ol>
        {favourites.length ? 
          favourites.map(favourite => (
            <li key={favourite.code}>
              <Currency buttonValue={buttonValue} rate={favourite} />
            </li>
          )) : null}
      </ol>
    </div>
  );
};

export const CurrencyApp = ({ currencies, error, favourites, isLoading }) => {
  return (
    <div id="currencyApp">
      {error ? <Error /> : null}
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <CurrencyList currencies={currencies} buttonValue='Add' />
          <FavouriteList favourites={favourites} buttonValue='Remove' />
        </>
      )}
    </div>
  );
};