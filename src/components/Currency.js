import React, { useReducer } from 'react';

const Error = () => (
  <div className="error">An error occurred during save.</div>
);

const Loading = () => (
  <div>Loading...</div>
);

const updateCurrencies = (currencies, currency) => {
  return currencies.map((currencyObject) => {
    if (currencyObject.currency === currency.currency) {
      return {
        ...currencyObject,
        isInFauvorite: true,
      };
    } else {
      return {
        ...currencyObject,
      };
    }
  });
};

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

export const FavouriteList = ({buttonValue, favourites}) => {
  return (
    <div id="favouriteList">
      <ol>
        {favourites.map(favourite => (
          <li key={favourite.code}>
            <Currency buttonValue={buttonValue} rate={favourite} />
          </li>
        ))}
      </ol>
    </div>
  );
};

const ACTIONS = {
  ADD_TO_FAVOURITES: 'ADD_TO_FAVOURITES',
};

export const CurrencyApp = ({ currencies, error, favourites, isLoading }) => {
  const [state, dispatch] = useReducer(reducer, { currencies, favourites });

  function reducer(state, action) {
    console.log(state, action);
    switch (action.type) {
      case ACTIONS.ADD_TO_FAVOURITES:
        return {
          currencies: [...updateCurrencies(state.currencies.length ? state.currencies : currencies, action.currency)],
          favourites: [...state.favourites, { ...action.currency }],
        };
      default:
        return state;
    }
  }

  function handleClickToAdd(event, currency) {
    event.preventDefault();
  
    dispatch({ type: ACTIONS.ADD_TO_FAVOURITES, currency });
  }

  return (
    <div id="currencyApp">
      {error ? <Error /> : null}
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <CurrencyList
            buttonValue="Add"
            currencies={currencies}
            handleClick={handleClickToAdd}
          />
          <FavouriteList buttonValue="Remove" favourites={state.favourites} />
        </>
      )}
    </div>
  );
};