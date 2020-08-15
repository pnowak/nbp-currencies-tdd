import React from 'react';

export const Rate = ({ rate }) => (
    <div>{rate.currency}</div>
);

export const CurrencyList = ({currencies}) => (
    <div id="currencyList">
        <ol>
            {currencies.map((currency) => (
                <li key={currency.code}>{currency.currency}</li>
            ))}
        </ol>
    </div>
);