import React from 'react';
import { connect } from 'react-redux';
import { Error } from './Error';
import { Loading } from './Loading';
import { CurrencyList } from './CurrencyList';
import { FavouriteList } from './FavouriteList';

const mapStateToProps = (state) => {
  const { error, isLoading } = state;

  return { error, isLoading };
};

export const App = connect(
  mapStateToProps,
)(
  ({ error, isLoading }) => {

    return (
      <div id="currencyApp">
        {error ? <Error /> : null}
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <CurrencyList />
            <FavouriteList />
          </>
        )}
      </div>
    );
  }
);