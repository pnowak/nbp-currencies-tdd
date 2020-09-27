import {
  FETCH_CURRENCIES_STARTED,
  FETCH_CURRENCIES_SUCCEDED,
  FETCH_CURRENCIES_FAILED,
  ADD_TO_FAVOURITE,
  REMOVE_FROM_FAVOURITE,
  REMOVE_ALL_FROM_FAVOURITE,
} from '../constans';

const initialState = {
  isLoading: false,
  error: null,
  currencies: [],
  favourites: []
};

const updateCurrencies = (currencies, currency, boolean) => {
  return currencies.map((currencyObject) => {
    if (currencyObject.currency === currency.currency) {
      return {
        ...currencyObject,
        isInFauvorite: boolean,
      };

    } else {
      return {
        ...currencyObject,
      };
    }
  });
};

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CURRENCIES_STARTED: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case FETCH_CURRENCIES_SUCCEDED: {
      const { payload } = action;

      return {
        ...state,
        currencies: payload.currencies,
        isLoading: false,
      };
    }

    case FETCH_CURRENCIES_FAILED: {
      const { payload } = action;

      return {
        ...state,
        error: payload.error,
        isLoading: false,
      };
    }

    case ADD_TO_FAVOURITE: {
      const { payload } = action;

      return {
        currencies: [
          ...updateCurrencies(state.currencies, payload.currency, true),
        ],
        favourites: [...state.favourites, { ...payload.currency }],
      };
    }

    case REMOVE_FROM_FAVOURITE: {
      const { payload } = action;

      const filterFavourites = state.favourites.filter((currency) => {
        return payload.currency.currency !== currency.currency;
      });

      return {
        currencies: [...updateCurrencies(payload.currencies, payload.currency, false)],
        favourites: filterFavourites,
      };
    }

    case REMOVE_ALL_FROM_FAVOURITE: {
      const { payload } = action;
        
      const favouritesCurrency = state.favourites.reduce((prev, next) => {
        prev.push(next.currency);

        return prev;
      }, []);

      const updatedCurrencies = favouritesCurrency.forEach((currency) => {
        updateCurrencies(payload.currencies, currency, false);
      })

      return {
        currencies: updatedCurrencies,
        favourites: [],
      };
    }

    default: {
      return state;
    }
  }
}