import React, { useEffect } from 'react';
import { CurrencyList } from "./Currency";

export const CurrencyLoader = () => {
    useEffect(() => {
      const fetchAvailableCurrencies = async () => {
        const response = await window.fetch(
          "https://api.nbp.pl/api/exchangerates/tables/c?format=json",
          {
            method: "GET",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "http://localhost:5000",
            },
          }
        );
      };

      fetchAvailableCurrencies();
    }, []);

    return (
        <CurrencyList currencies={[]} />
    );
}