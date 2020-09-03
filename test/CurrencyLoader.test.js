import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import 'whatwg-fetch';
import { CurrencyLoader } from '../src/CurrencyLoader';
import * as CurrencyListExports from '../src/Currency';

describe('CurrencyLoader', () => {
  let renderAndWait, container;

  const currencies = [{ "currency": "dolar amerykański", "code": "USD", "bid": 3.6703, "ask": 3.7445 },
    { "currency": "euro", "code": "EUR", "bid": 4.3420, "ask": 4.4298 }];

  const fetchResponseOk = body =>
    Promise.resolve(body);

  beforeEach(() => {
    container = document.createElement('div');

    renderAndWait = async component =>
      await act(async () => {
        ReactDOM.render(component, container);
      });
    jest
      .spyOn(window, 'fetch')
      .mockReturnValue(fetchResponseOk(currencies));
    jest
      .spyOn(CurrencyListExports, 'CurrencyList')
      .mockReturnValue(null);
  });

  afterEach(() => {
    window.fetch.mockRestore();
    CurrencyListExports.CurrencyList.mockRestore();
  });

  it.skip('fetches data when component is mounted', async () => {
    await renderAndWait(<CurrencyLoader />);

    expect(window.fetch).toHaveBeenCalledWith(
      'https://cors-anywhere.herokuapp.com/https://api.nbp.pl/api/exchangerates/tables/c?format=json',
      expect.objectContaining({
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Origin, X-Requested-With'
        },
      })
    );
  });

  it('initially passes no data to CurrencyList', async () => {
    await renderAndWait(<CurrencyLoader />);

    expect(CurrencyListExports.CurrencyList).toHaveBeenCalledWith(
      { buttonValue: 'Add', currencies: [], isError: false, isLoading: true },
      expect.anything()
    );
  });

  it.skip('displays currencies list that are fetched on mount', async () => {
    await renderAndWait(<CurrencyLoader />);

    expect(CurrencyListExports.CurrencyList).toHaveBeenLastCalledWith(
      { buttonValue: 'Add', currencies },
      expect.anything()
    );
  });
})
