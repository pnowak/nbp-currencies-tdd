import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import 'whatwg-fetch';
import { CurrencyLoader } from '../src/CurrencyLoader';
import * as CurrencyListExports from '../src/Currency';

describe('CurrencyLoader', () => {
  let container;

  const currencies = [{ "currency": "dolar amerykański", "code": "USD", "bid": 3.6703, "ask": 3.7445 },
    { "currency": "euro", "code": "EUR", "bid": 4.3420, "ask": 4.4298 }];

  const fetchResponseOk = body =>
    Promise.resolve(body);

  const fetchResponseError = (status = 500, body = {}) =>
    Promise.resolve({
      ok: false,
      status,
      json: () => Promise.resolve(body),
    });

  const element = selector => container.querySelector(selector);

  beforeEach(() => {
    container = document.createElement('div');

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

  const renderAndWait = async component =>
    await act(async () => {
      ReactDOM.render(component, container);
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
      { buttonValue: "Add", currencies: [], error: false, isLoading: true },
      expect.anything()
    );
  });

  it.skip('renders error message when fetch call fails', async () => {
    window.fetch.mockReturnValue(fetchResponseError());

    await renderAndWait(<CurrencyLoader error={Error} />);

    expect(CurrencyListExports.CurrencyList).toHaveBeenLastCalledWith(
      { buttonValue: "Add", currencies: [], error: true, isLoading: false },
      expect.anything()
    );

    expect(element('.error')).not.toBeNull();
    expect(element('.error').textContent).toMatch(
      'error occurred'
    );
  });

  it.skip('displays currencies list that are fetched on mount', async () => {
    window.fetch.mockReturnValue(fetchResponseOk(currencies));
    
    await renderAndWait(<CurrencyLoader />);

    expect(CurrencyListExports.CurrencyList).toHaveBeenLastCalledWith(
      { buttonValue: "Add", currencies, error: false, isLoading: false },
      expect.anything()
    );
  });
})
