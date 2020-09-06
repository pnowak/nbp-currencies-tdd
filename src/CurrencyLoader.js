import React, { useEffect, useState } from 'react';
import { CurrencyApp } from './Currency';

export const CurrencyLoader = () => {
  const [currencies, setCurrencies] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
    
  useEffect(() => {
    const fetchAvailableCurrencies = async () => {
      try {
        setIsLoading(true);

        const response = await window.fetch(
          'https://cors-anywhere.herokuapp.com/https://api.nbp.pl/api/exchangerates/tables/c?format=json',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Headers':
                  'Origin, X-Requested-With, Content-Type, Accept',
            },
          }
        );
        const data = await response.json();

        setCurrencies(data[0].rates);

      } catch (error) {
        setError(true);
      }

      setIsLoading(false);
    };

    fetchAvailableCurrencies();
  }, []);

  return (
    <CurrencyApp
      currencies={currencies}
      error={error}
      favourites={[]}
      isLoading={isLoading}
    />
  );
}