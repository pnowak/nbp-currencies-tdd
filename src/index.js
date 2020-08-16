import React from 'react';
import ReactDOM from 'react-dom';
import { CurrencyList } from './Rate';

const sampleCurrencies = [
    { currency: 'dolar amerykański', code: 'USD' },
    { currency: 'dolar australijski', code: 'AUD' },
    { currency: 'dolar kanadyjski', code: 'CAD' },
    { currency: 'euro', code: 'EUR' },
    { currency: 'forint (Węgry)', code: 'HUF' },
    { currency: 'frank szwajcarski', code: 'CHF' },
    { currency: 'funt szterling', code: 'GBP' },
    { currency: 'jen (Japonia)', code: 'JPY' },
    { currency: 'korona czeska', code: 'CZK' },
    { currency: 'korona duńska', code: 'DKK' },
    { currency: 'korona norweska', code: 'NOK' },
    { currency: 'korona szwedzka', code: 'SEK' }
];

ReactDOM.render(
    <CurrencyList currencies={sampleCurrencies} buttonValue='Add' />,
    document.getElementById('root')
);