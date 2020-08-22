import React, { useEffect, useState } from 'react';

export const Currency = ({ rate, buttonValue }) => (
    <>
        <span>{rate.currency}</span>
        <button type="button">{buttonValue}</button>
    </>
);

export const CurrencyList = ({ currencies, buttonValue }) => {
    return (
        <div id="currencyList">
            {currencies.length === 0 ? (
            <p>There are no currencies yet.</p>
            ) : (
            <ol>
                {currencies.map((currency) => (
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