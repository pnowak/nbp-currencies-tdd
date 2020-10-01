import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Currency } from './Currency';
import { removeFromFavourite, removeAllFromFavourite } from '../actions';

const mapStateToProps = (state) => {
  const { favourites } = state;

  return { favourites };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { removeFromFavourite, removeAllFromFavourite },
    dispatch
  );

export const FavouriteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(
  ({
    favourites,
    removeFromFavourite,
    removeAllFromFavourite,
  }) => {
    return (
      <div id="favouriteList">
        <ol>
          {favourites.map(favourite => (
            <li key={favourite.code}>
              <Currency
                buttonValue={'Remove'}
                handleClick={removeFromFavourite}
                rate={favourite}
              />
            </li>
          ))}
        </ol>
        {favourites.length ? (
          <button type="button" onClick={removeAllFromFavourite}>
            Remove all
          </button>
        ) : null}
      </div>
    );
  }
);