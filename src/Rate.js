import React from 'react';

export const Rate = ({ rate, buttonValue }) => (
    <>
        <span>{rate.currency}</span>
        <button type="button">{buttonValue}</button>
    </>
);

export const CurrencyList = ({currencies, buttonValue}) => {
    return (
        <div id="currencyList">
            {currencies.length === 0 ? (
                <p>There are no currencies yet.</p>
            ) : (
                    <ol>
                        {currencies.map((currency) => (
                            <li key={currency.code}><Rate rate={currency} buttonValue={buttonValue} /></li>
                        ))}
                    </ol>
                )}
        </div>
    )
};