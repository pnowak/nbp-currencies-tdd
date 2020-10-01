import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Currency } from './Currency';
import { addToFavourite } from '../actions';

const mapStateToProps = (state) => {
  const { currencies } = state;

  return { currencies };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { addToFavourite },
    dispatch
  );

export const CurrencyList = connect(
  mapStateToProps,
  mapDispatchToProps
)(({ currencies, addToFavourite }) => {
  return (
    <div id="currencyList">
      <ol>
        {currencies.map(currency => (
          <li key={currency.code}>
            <Currency
              buttonValue={'Add'}
              handleClick={addToFavourite}
              rate={currency}
            />
          </li>
        ))}
      </ol>
    </div>
  );
});