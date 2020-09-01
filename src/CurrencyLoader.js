import React, { useEffect, useState } from 'react';
import { CurrencyList } from "./Currency";

export const CurrencyLoader = () => {
  const [currencies, setCurrencies] = useState([]);
  const [isError, setIsError] = useState(false);
    
  useEffect(() => {
    const fetchAvailableCurrencies = async () => {
      try {
        const response = await window.fetch(
          "https://cors-anywhere.herokuapp.com/https://api.nbp.pl/api/exchangerates/tables/c?format=json",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Headers":
                  "Origin, X-Requested-With, Content-Type, Accept",
            },
          }
        );
        const data = await response.json();

        setCurrencies(data[0].rates);

      } catch (error) {
        setIsError(true);
      }
    };

    fetchAvailableCurrencies();
  }, []);

  return (
    <CurrencyList currencies={currencies} isError={isError} buttonValue="Add" />
  );
}