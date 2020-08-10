import React from 'react';
import ReactDOM from 'react-dom';
import { Rate } from '../src/Rate';

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