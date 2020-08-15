import React from 'react';

export const Rate = ({ rate }) => (
    <>
        <span>{rate.currency}</span>
        <button type="button"></button>
    </>
);

export const CurrencyList = ({currencies}) => {
    return (
        <div id="currencyList">
            {currencies.length === 0 ? (
                <p>There are no currencies yet.</p>
            ) : (
                    <ol>
                        {currencies.map((currency) => (
                            <li key={currency.code}><Rate rate={currency} /></li>
                        ))}
                    </ol>
                )}
        </div>
    )
};