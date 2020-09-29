import React from 'react';
import Currency from './Currency';

export const FavouriteList = ({ buttonValue, favourites, handleClick }) => {
  return (
    <div id="favouriteList">
      <ol>
        {favourites.map(favourite => (
          <li key={favourite.code}>
            <Currency
              buttonValue={buttonValue}
              handleClick={handleClick}
              rate={favourite}
            />
          </li>
        ))}
      </ol>
    </div>
  );
};