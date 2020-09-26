import {
  FETCH_CURRENCIES_STARTED,
  FETCH_CURRENCIES_SUCCEDED,
  FETCH_CURRENCIES_FAILED,
  ADD_TO_FAVOURITE,
  REMOVE_FROM_FAVOURITE,
  REMOVE_ALL_FROM_FAVOURITE,
} from '../constans';

export const addToFavourite = (currency) => {
  return {
    type: ADD_TO_FAVOURITE,
    payload: {
      currency,
    },
  };
};

export const removeFromFavourite = (currency) => {
  return {
    type: REMOVE_FROM_FAVOURITE,
    payload: {
      currency,
    },
  };
};

export const removeAllFromFavourite = () => {
  return {
    type: REMOVE_ALL_FROM_FAVOURITE,
  };
};

export function fetchAvailableCurrencies() {
  return async (dispatch) => {
    dispatch(fetchCurrenciesStarted());

    try {
      const response = await window.fetch(
        'https://cors-anywhere.herokuapp.com/https://api.nbp.pl/api/exchangerates/tables/c?format=json',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers':
              'Origin, X-Requested-With, Content-Type, Accept',
          },
        }
      );
      const data = await response.json();

      dispatch(fetchCurrenciesSucceeded(data[0].rates));

    } catch (error) {
      dispatch(fetchCurenciesFailed(error.message));
    }
  }
}

function fetchCurrenciesSucceeded(currencies) {
  return {
    type: FETCH_CURRENCIES_SUCCEDED,
    payload: {
      currencies,
    },
  };
}

function fetchCurenciesFailed(error) {
  return {
    type: FETCH_CURRENCIES_FAILED,
    payload: {
      error,
    },
  };
}

function fetchCurrenciesStarted() {
  return {
    type: FETCH_CURRENCIES_STARTED,
  };
}