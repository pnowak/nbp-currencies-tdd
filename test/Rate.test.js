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
    const currencies = [
        { currency: 'dolar amerykański', code: 'USD' },
        { currency: 'euro', code: 'EUR' }
    ];
    let container;

    beforeEach(() => {
        container = document.createElement('div');
    });

    const render = (component) => ReactDOM.render(component, container);
    const element = selector => container.querySelector(selector);
    const elements = selector => container.querySelectorAll(selector);

    it('renders a div with the right id', () => {
        render(<CurrencyList currencies={[]} />, container);

        expect(element('div#currencyList')).not.toBeNull();
    });

    it('initially shows a message saying there are no currencies yet', () => {
        render(<CurrencyList currencies={[]} />, container);

        expect(container.textContent).toMatch('There are no currencies yet');
    });

    it('renders multiple currencies in an ol element', () => {
        render(<CurrencyList currencies={currencies} />, container);
        expect(element('ol')).not.toBeNull();
        expect(element('ol').children).toHaveLength(2);
    });

    it('renders each currency in an li', () => {
        render(<CurrencyList currencies={currencies} />, container);
        expect(elements('li')).toHaveLength(2);
        expect(elements('li')[0].textContent).toEqual('dolar amerykański');
        expect(elements('li')[1].textContent).toEqual('euro');
    });

    it('has a button element in each li', () => {
        render(<CurrencyList currencies={currencies} />, container);
        expect(elements('li > button')).toHaveLength(2);
        expect(elements('li > button')[0].type).toEqual('button');
    });
});