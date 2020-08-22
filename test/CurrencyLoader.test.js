import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import 'whatwg-fetch';
import { CurrencyLoader } from '../src/CurrencyLoader';
import { CurrencyList } from '../src/Currency';

describe('CurrencyLoader', () => {
    let renderAndWait, container;

   const currencies = [
        { currency: 'dolar amerykański', code: 'USD' },
        { currency: 'euro', code: 'EUR' }
    ];

    const fetchResponseOk = (body) =>
      Promise.resolve(
        {
            ok: true,
            json: () => Promise.resolve(body),
        });

    beforeEach(() => {
        container = document.createElement('div');
        renderAndWait = async (component) =>
            await act(async () => {
                ReactDOM.render(component, container);
            });
        jest
          .spyOn(window, "fetch")
          .mockReturnValue(fetchResponseOk(currencies));
    });

    afterEach(() => {
        window.fetch.mockRestore();
    });

    it('fetches data when component is mounted', async () => {
        await renderAndWait(<CurrencyLoader />);

        expect(window.fetch).toHaveBeenCalledWith(
            "https://api.nbp.pl/api/exchangerates/tables/c?format=json",
            expect.objectContaining({
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "http://localhost:5000",
                },
            })
        );
    });
})
