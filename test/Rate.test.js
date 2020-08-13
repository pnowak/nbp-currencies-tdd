import React from 'react';
import ReactDOM, { render } from 'react-dom';
import { Rate, CurrencyList } from '../src/Rate';

describe('Rate', () => {
    let container;
    let rate;

    beforeEach(() => {
        container = document.createElement('div');
    });

    const render = (component) => ReactDOM.render(component, container);

    it('renders the currency rate', () => {
        rate = { currency: 'dolar amerykański' };

        render(<Rate rate={rate} />, container);
        expect(container.textContent).toMatch('dolar amerykański');
    });

    it('renders another the currency value', () => {
        rate = { currency: 'euro' };

        render(<Rate rate={rate} />, container);
        expect(container.textContent).toMatch('euro');
    });
});

describe('CurrencyList', () => {
    let container;

    beforeEach(() => {
        container = document.createElement('div');
    });

    const render = (component) => ReactDOM.render(component, container);

    it('renders a div with the right id', () => {
        render(<CurrencyList currencies={[]} />, container);

        expect(container.querySelector('div#currencyList')).not.toBeNull();
    });
});